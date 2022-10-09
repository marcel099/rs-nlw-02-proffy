import { Request, Response } from 'express';

import db from '../database/connection';

export class UsersController {
  async create(request: Request, response: Response) {
    const {
      first_name,
      last_name,
      email,
      password,
    } = request.body;

    await db('users').insert({
      first_name,
      last_name,
      email,
      password,
    })

    return response.status(201).json();
  }
}
