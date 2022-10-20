import { storageProvider } from '@providers/StorageProvider';
import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import { db } from '@database/connection';
import { Class } from '@dtos/Class';
import { ClassSchedule } from '@dtos/ClassSchedule';
import { User } from '@dtos/User';
import { convertHourToMinutes } from '@utils/convertHoursToMinutes';

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

type ClassScheduleToInsertDTO = Pick<
  ClassSchedule,
  'week_day' | 'from' | 'to' | 'class_id'
>;

// eslint-disable-next-line prettier/prettier
type ClassScheduleToUpdateDTO = Pick<
  ClassSchedule,
  'week_day' | 'from' | 'to'
>;

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

      const formattedClassSchedules: ClassScheduleFormattedDTO[] =
        schedules.map((schedule) => ({
          id: schedule.id,
          class_id,
          week_day: schedule.week_day,
          from: convertHourToMinutes(schedule.from),
          to: convertHourToMinutes(schedule.to),
        }));

      const classSchedulesToInsert: ClassScheduleToInsertDTO[] = [];

      if (isThereAClass) {
        const myClassSchedules: ClassSchedule[] = await trx('class_schedule')
          .select('*')
          .where({ class_id: class_id ?? -1 });

        const classSchedulesToUpdate: ClassScheduleFormattedDTO[] = [];

        formattedClassSchedules.forEach((formattedSchedule) => {
          if (formattedSchedule.id === null) {
            classSchedulesToInsert.push({
              week_day: formattedSchedule.week_day,
              from: formattedSchedule.from,
              to: formattedSchedule.to,
              class_id: formattedSchedule.class_id,
            });
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

        await trx('class_schedule')
          .whereIn('id', classSchedulesToDeleteIds)
          .delete();
        // eslint-disable-next-line no-restricted-syntax
        for (const schedule of classSchedulesToUpdate) {
          const formattedScheduleToInsert: ClassScheduleToUpdateDTO = {
            week_day: schedule.week_day,
            from: schedule.from,
            to: schedule.to,
          };

          // eslint-disable-next-line no-await-in-loop
          await trx('class_schedule')
            .where({ id: schedule.id })
            .update(formattedScheduleToInsert);
        }
      } else {
        formattedClassSchedules.forEach((formattedSchedule) => {
          classSchedulesToInsert.push({
            week_day: formattedSchedule.week_day,
            from: formattedSchedule.from,
            to: formattedSchedule.to,
            class_id: formattedSchedule.class_id,
          });
        });
      }
      await trx('class_schedule').insert(classSchedulesToInsert);

      await trx.commit();

      response.status(200).json();
    } catch (error: any) {
      if (error?.code === 'SQLITE_MISUSE') {
        response.status(200).json();
      } else {
        console.error(error);
        await trx.rollback();

        response.status(400).json({
          error: 'Erro inesperado ao atualizar perfil',
        });
      }
    }
  }

  async updateAvatar(request: Request, response: Response) {
    try {
      const avatarFileName = request.file?.filename;

      if (avatarFileName === undefined) {
        response.status(400).json({
          message: 'Imagem de avatar não enviado.',
        });
        return;
      }

      const [user]: User[] = await db('users')
        .select('first_name', 'last_name', 'email', 'avatar')
        .where({ id: request.user.id });

      if (user.avatar) {
        await storageProvider.delete(user.avatar, 'avatar');
      }

      await storageProvider.save(avatarFileName, 'avatar');

      await db('users')
        .where({ id: request.user.id })
        .update({ avatar: avatarFileName });

      response.status(200).json();
    } catch (error) {
      console.error(error);

      response.status(500).json();
    }
  }
}
