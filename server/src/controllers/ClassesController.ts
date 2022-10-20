import { Request, Response } from 'express';

import { db } from '@database/connection';
import { convertHourToMinutes } from '@utils/convertHoursToMinutes';

export default class ClassesControler {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
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
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select('classes.*', 'users.*');

    return response.json(classes);
  }
}
