import { Request, Response } from 'express';

import { db } from '@database/connection';
import { convertHourToMinutes } from '@utils/convertHoursToMinutes';

interface QueryUserClass {
  user_id: number;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  whatsapp: string;
  lesson_id: number;
  lesson_cost: number;
  subject_name: string;
}

interface QueryClassSchedule {
  id: number;
  week_day: number;
  from: string;
  to: string;
}

interface ResponseUnitDTO {
  user_id: number;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string | null;
  whatsapp: string;
  lesson: {
    cost: number;
  };
  subject: {
    name: string;
  };
  class_schedules: QueryClassSchedule[];
}

interface ResponseTeacherList {
  data: ResponseUnitDTO[];
  offset: number;
  total: number;
}

interface GetUserClassBaseQueryParams {
  week_day: string | undefined;
  subject_id: string | undefined;
  timeInMinutes: number | undefined;
}

function getUserClassBaseQuery({
  week_day,
  subject_id,
  timeInMinutes,
}: GetUserClassBaseQueryParams) {
  return db('classes as c')
    .join('users as u', 'c.user_id', '=', 'u.id')
    .join('subjects as s', 'c.subject_id', '=', 's.id')
    .select(
      'u.id as user_id',
      'u.first_name',
      'u.last_name',
      'u.bio',
      'u.avatar',
      'u.whatsapp',
      'c.id as lesson_id',
      'c.cost as lesson_cost',
      's.name as subject_name'
    )
    .whereExists(function sample() {
      this.select('cs.*')
        .from('class_schedule as cs')
        .whereRaw('cs.class_id = c.id')
        .modify((queryBuilder) => {
          if (week_day !== undefined) {
            queryBuilder.where('cs.week_day', '=', Number(week_day));
          }

          if (timeInMinutes !== undefined) {
            queryBuilder
              .where('cs.from', '<=', timeInMinutes)
              .where('cs.to', '>', timeInMinutes);
          }
        });
    })
    .modify((queryBuilder) => {
      if (subject_id !== undefined) {
        queryBuilder.where('c.subject_id', '=', subject_id);
      }
    })
    .groupBy('u.id', 'c.id', 's.id');
}

export class ClassesControler {
  async list(request: Request, response: Response) {
    const filters = request.query;

    const { page } = filters;

    const subject_id = filters.subject_id as string;
    const week_day = filters.week_day as string;

    let timeInMinutes: number | undefined;
    if (filters.time === undefined) {
      timeInMinutes = filters.time;
    } else {
      timeInMinutes = convertHourToMinutes(filters.time as string);
    }

    // eslint-disable-next-line prettier/prettier
    const offset = page !== undefined
      ? (Number(page) - 1) * 5
      : 0;

    const countUserClassQuery = getUserClassBaseQuery({
      subject_id,
      week_day,
      timeInMinutes,
    });

    const result = await countUserClassQuery.count('c.id as total');

    let total = 0;
    if (result.length > 0) {
      total = Number(result[0].total);
    }

    const fullUserClassQuery = getUserClassBaseQuery({
      subject_id,
      week_day,
      timeInMinutes,
    });

    const lessons: QueryUserClass[] = await fullUserClassQuery
      .limit(5)
      .offset(offset);

    const parsedClasses: ResponseUnitDTO[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const lesson of lessons) {
      // eslint-disable-next-line no-await-in-loop
      const class_schedules: QueryClassSchedule[] = await db(
        'class_schedule as cs'
      )
        .select('cs.id', 'cs.week_day', 'cs.from', 'cs.to')
        .where('cs.class_id', '=', lesson.lesson_id);

      const newLesson: ResponseUnitDTO = {
        user_id: lesson.user_id,
        first_name: lesson.first_name,
        last_name: lesson.last_name,
        bio: lesson.bio,
        avatar_url:
          lesson.avatar !== null
            ? `${process.env.API_URL}/avatar/${lesson.avatar}`
            : null,
        whatsapp: lesson.whatsapp,
        subject: {
          name: lesson.subject_name,
        },
        lesson: {
          cost: lesson.lesson_cost,
        },
        class_schedules,
      };

      parsedClasses.push(newLesson);
    }

    const responseData: ResponseTeacherList = {
      data: parsedClasses,
      offset,
      total,
    };

    return response.json(responseData);
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
