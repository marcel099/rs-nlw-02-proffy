import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';

import db from './../database/connection';

export default class UsersController {
  async index(request: Request, response: Response) {
    const users = await db('users');

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const {
      email,
      password,
    } = request.body;

    if ( !email || !password ) {
      return response.status(400).json({
        err: 'Filtros não informados para listar aulas'
      })
    }

    bcrypt.hash(password, 10).then( async ( encryptedPassword ) => {
      console.log(encryptedPassword)
      
      await db('users').insert({
        email,
        password: encryptedPassword,
      })
      
      return response.status(201).json()
    }).catch( err => {
      return response.status(500).json({msg: 'Erro na criptografação da senha.', err})
    })
  }
}