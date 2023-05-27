import { Request, Response } from 'express';

import { db } from '@database/connection';
import { convertHourToMinutes } from '@utils/convertHoursToMinutes';

interface QueryUserClass {
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  whatsapp: string;
  class_id: number;
  class_cost: number;
  subject_name: string;
}

interface QueryClassSchedule {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

interface ResponseUnitDTO {
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  whatsapp: string;
  class: {
    cost: number;
  };
  subject: {
    name: string;
  };
  class_schedules: QueryClassSchedule[];
}

export class ClassesControler {
  async list(request: Request, response: Response) {
    const filters = request.query;

    const subject_id = filters.subject_id as string;
    const week_day = filters.week_day as string;

    let timeInMinutes: number | undefined;
    if (filters.time === undefined) {
      timeInMinutes = filters.time;
    } else {
      timeInMinutes = convertHourToMinutes(filters.time as string);
    }

    const classes: QueryUserClass[] = await db('classes as c')
      .join('users as u', 'c.user_id', '=', 'u.id')
      .join('subjects as s', 'c.subject_id', '=', 's.id')
      .select(
        'u.first_name',
        'u.last_name',
        'u.bio',
        'u.avatar',
        'u.whatsapp',
        'c.id as class_id',
        'c.cost as class_cost',
        's.name as subject_name'
      )
      .whereExists(function sample() {
        this.select('cs.*')
          .from('class_schedule as cs')
          .whereRaw('`cs`.`class_id` = `c`.`id`')
          .modify((queryBuilder) => {
            if (week_day) {
              queryBuilder.where('cs.week_day', '=', Number(week_day));
            }

            if (timeInMinutes) {
              queryBuilder
                .where('cs.from', '<=', timeInMinutes)
                .where('cs.to', '>', timeInMinutes);
            }
          });
      })
      .modify((queryBuilder) => {
        if (subject_id) {
          queryBuilder.where('c.subject_id', '=', subject_id);
        }
      });

    const parsedClasses: ResponseUnitDTO[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const clas of classes) {
      // eslint-disable-next-line no-await-in-loop
      const class_schedules: QueryClassSchedule[] = await db(
        'class_schedule as cs'
      )
        .select('cs.id', 'cs.week_day', 'cs.from', 'cs.to')
        .where('cs.class_id', '=', clas.class_id);

      const newClas: ResponseUnitDTO = {
        first_name: clas.first_name,
        last_name: clas.last_name,
        bio: clas.bio,
        avatar_url: `${process.env.API_URL}/avatar/${clas.avatar}`,
        whatsapp: clas.whatsapp,
        subject: {
          name: clas.subject_name,
        },
        class: {
          cost: clas.class_cost,
        },
        class_schedules,
      };

      parsedClasses.push(newClas);
    }

    return response.json(parsedClasses);
  }

  async userClassSchedules(request: Request, response: Response) {
    const [teacherClass] = await db('classes as c')
      .select('c.id as class_id', 'c.cost as class_cost', 's.id as subject_id')
      .join('subjects as s', 's.id', 'c.subject_id')
      .where('user_id', '=', request.user.id);

    let teacherClassSchedules: QueryClassSchedule[] = [];

    if (teacherClass !== undefined) {
      teacherClassSchedules = await db('class_schedule as cs')
        .select('cs.id', 'cs.week_day', 'cs.from', 'cs.to')
        .where('cs.class_id', '=', teacherClass.class_id);
    }

    return response.json({
      class: {
        cost: teacherClass?.class_cost ?? null,
        subject: {
          id: teacherClass?.subject_id ?? null,
        },
      },
      class_schedules: teacherClassSchedules,
    });
  }
}
