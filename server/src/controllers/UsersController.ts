import { Request, Response } from 'express';
import { hash } from "bcrypt";

import db from '../database/connection';

export class UsersController {
  async me(request: Request, response: Response) {
    const result = await db('users')
      .select('first_name', 'last_name', 'email', 'avatar')
      .where('id', '=', request.user.id);

    return response.json(result[0]);
  }

  async create(request: Request, response: Response) {
    const {
      first_name,
      last_name,
      email,
      password,
    } = request.body;

    const userFound = await db('users')
      .where('email', '=', email)
      .select('id', 'password')
      .first();

    if (userFound) {
      return response.status(400).json({
        message: 'Usuário já existe'
      })
    }

    const passwordHash = await hash(password, 8);

    await db('users').insert({
      first_name,
      last_name,
      email,
      password: passwordHash,
    })

    return response.status(201).json();
  }
}
