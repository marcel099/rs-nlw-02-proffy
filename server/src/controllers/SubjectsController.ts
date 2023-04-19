import { Request, Response } from 'express';

import { db } from '@database/connection';

export class SubjectsController {
  async list(request: Request, response: Response) {
    const subjects = await db('subjects').select('subjects.*');

    return response.json(subjects);
  }
}
