import { Request, Response } from 'express';

import { db } from '@database/connection';
import { convertHourToMinutes } from '@utils/convertHoursToMinutes';

export default class ClassesControler {
  async list(request: Request, response: Response) {
    const filters = request.query;

    const subject_id = filters.subject_id as string;
    const week_day = filters.week_day as string;

    if (!filters.week_day || !filters.subject_id || !filters.time) {
      return response.status(400).json({
        err: 'Filtros não informados para listar aulas',
      });
    }

    const timeInMinutes = convertHourToMinutes(filters.time as string);

    const classes = await db('classes')
      .whereExists(function sample() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject_id', '=', subject_id)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select('classes.*', 'users.*');

    return response.json(classes);
  }

  async userClassSchedules(request: Request, response: Response) {
    const [teacherClass] = await db('classes as c')
      .select('c.id as class_id', 'c.cost as class_cost', 's.id as subject_id')
      .join('subjects as s', 's.id', 'c.subject_id')
      .where('user_id', '=', request.user.id);

    let teacherClassSchedules: any = [];

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
