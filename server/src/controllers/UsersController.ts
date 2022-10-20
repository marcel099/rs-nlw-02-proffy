import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import { Class } from '@dtos/Class';
import { ClassSchedule } from '@dtos/ClassSchedule';

import db from '../database/connection';
import { convertHourToMinutes } from '../utils/convertHoursToMinutes';

type ClassScheduleRequestBodyDTO = Pick<ClassSchedule, 'week_day'> & {
  id: number | null;
  from: string;
  to: string;
};

type ClassScheduleFormattedDTO = Pick<
  ClassSchedule,
  'week_day' | 'from' | 'to' | 'class_id'
> & {
  id: number | null;
};

interface UpdateProfileRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  whatsapp: string;
  bio: string;

  cost: number;
  subject_id: number;
  schedules: ClassScheduleRequestBodyDTO[];
}

export class UsersController {
  async me(request: Request, response: Response) {
    const result = await db('users')
      .select('first_name', 'last_name', 'email', 'avatar')
      .where('id', '=', request.user.id);

    return response.json(result[0]);
  }

  async create(request: Request, response: Response) {
    const { first_name, last_name, email, password } = request.body;

    const userFound = await db('users')
      .where('email', '=', email)
      .select('id', 'password')
      .first();

    if (userFound) {
      return response.status(400).json({
        message: 'Usuário já existe',
      });
    }

    const passwordHash = await hash(password, 8);

    await db('users').insert({
      first_name,
      last_name,
      email,
      password: passwordHash,
    });

    return response.status(201).json();
  }

  async updateProfile(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const {
      first_name,
      last_name,
      email,
      whatsapp,
      bio,

      cost,
      subject_id,
      schedules,
    } = request.body as UpdateProfileRequestBody;

    const trx = await db.transaction();

    try {
      await trx('users').where({ id: user_id }).update({
        first_name,
        last_name,
        email,
        whatsapp,
        bio,
      });

      const [myPreviousClass]: Class[] = await trx('classes')
        .select('*')
        .where('user_id', '=', user_id)
        .limit(1);

      let class_id: number;

      const isThereAClass = myPreviousClass !== undefined;

      if (isThereAClass === false) {
        const insertedClassesIds = await trx('classes').insert({
          subject_id,
          cost,
          user_id,
        });

        // eslint-disable-next-line prefer-destructuring
        class_id = insertedClassesIds[0];
      } else {
        // eslint-disable-next-line prefer-destructuring
        class_id = myPreviousClass.id;

        const hasClassChanged =
          myPreviousClass.subject_id !== subject_id ||
          myPreviousClass.cost !== cost;

        if (hasClassChanged) {
          await trx('classes')
            .where({ user_id, subject_id: myPreviousClass.subject_id })
            .update({
              subject_id,
              cost,
            });
        }
      }

      console.log('NULL');
      // console.log(class_id);

      const formattedClassSchedules: ClassScheduleFormattedDTO[] =
        schedules.map((schedule) => ({
          id: schedule.id,
          class_id,
          week_day: schedule.week_day,
          from: convertHourToMinutes(schedule.from),
          to: convertHourToMinutes(schedule.to),
        }));

      if (isThereAClass) {
        const myClassSchedules: ClassSchedule[] = await trx('class_schedule')
          .select('*')
          .where({ class_id: class_id ?? -1 });

        // console.log({ formattedClassSchedules });
        // console.log({ myClassSchedules });

        const classSchedulesToInsert: ClassScheduleFormattedDTO[] = [];
        const classSchedulesToUpdate: ClassScheduleFormattedDTO[] = [];

        formattedClassSchedules.forEach((formattedSchedule) => {
          if (formattedSchedule.id === null) {
            classSchedulesToInsert.push(formattedSchedule);
          } else {
            const dbSchedule = myClassSchedules.find(
              (myClassSchedule) => formattedSchedule.id === myClassSchedule.id
            );

            if (dbSchedule) {
              const hasClassScheduleChanged =
                formattedSchedule.week_day !== dbSchedule.week_day ||
                formattedSchedule.from !== dbSchedule.from ||
                formattedSchedule.to !== dbSchedule.to;

              if (hasClassScheduleChanged) {
                classSchedulesToUpdate.push(formattedSchedule);
              }
            }
          }
        });

        const classSchedulesToDeleteIds: number[] = myClassSchedules
          .filter((mySchedule) => {
            const scheduleStillExists = formattedClassSchedules.some(
              (formattedSchedule) => mySchedule.id === formattedSchedule.id
            );

            return scheduleStillExists === false;
          })
          .map((myScheduleToDelete) => myScheduleToDelete.id);

        console.log(classSchedulesToInsert);
        console.log(classSchedulesToUpdate);
        console.log(classSchedulesToDeleteIds);

        await trx('class_schedule').insert(classSchedulesToInsert);
        await trx('class_schedule')
          .whereIn('id', classSchedulesToDeleteIds)
          .delete();
        // eslint-disable-next-line no-restricted-syntax
        for (const schedule of classSchedulesToUpdate) {
          // eslint-disable-next-line no-await-in-loop
          await trx('class_schedule')
            .where({ id: schedule.id })
            .update(schedule);
        }
      } else {
        await trx('class_schedule').insert(formattedClassSchedules);
      }

      await trx.commit();

      response.status(200).json();
    } catch (error: any) {
      if (error?.code === 'SQLITE_MISUSE') {
        response.status(200).json();
      } else {
        console.log(error);
        await trx.rollback();

        response.status(400).json({
          error: 'Erro inesperado ao atualizar perfil',
        });
      }
    }
  }
}
