import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import mailer from './../utils/mailer';

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
      await db('users').insert({
        email,
        password: encryptedPassword,
      })
      
      return response.status(201).json()
    }).catch( err => {
      return response.status(500).json({msg: 'Erro na criptografação da senha.'})
    })
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const userFound = await db('users')
        .where('email', '=', email)
        .select('id', 'password')
        .first();

      if ( !userFound ) {
        return response.status(400).json({msg: 'Usuário não encontrado'})
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date()
      const expires = now.setHours(now.getHours() + 1)    // aumenta uma hora e salva um timestamp

      // db('users')
      //   .where('user_id', '=', userFound.id)
      //   .update({
      //     reset_password: token,
      //   })

      console.log('token', token)
      console.log('expires', expires)

      mailer.sendMail({
        to: email,
        from: 'mar.lupatini@gmail.com',
        html: `<p>Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}}</p>`,
      }, (err) => {
        if (!!err)
          return response.status(500).json({msg: 'Não foi possível enviar o e-mail de recuperação de senha'})
        
        return response.json({msg: 'E-mail de recuperação enviado com sucesso!<br/>Por favor, verifique o e-mail na sua caixa de entrada'})
      })

    } catch ( err ) {
      console.log(err)
      return response.status(400).json()
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { 
      email,
      token,
      password
    } = request.body;

    try {
      const userFound = await db('users')
        .where('email', '=', email)
        .select('id', 'password_reset_token', 'password_reset_expires')
        .first();

      if ( !userFound ) {
        return response.status(400).json({msg: 'Usuário não encontrado'})
      }

      if ( token !== userFound.password_reset_token) {
        return response.status(400).json({msg: 'Token com assinatura inválida'})
      }

      const nowIso = new Date().toUTCString()

      if (nowIso > userFound.password_reset_expires) {
        return response.status(400).json({msg: 'Token expirado. Tente novamente.'})
      }

      // salva no banco de dados

      response.json({msg: 'Sua senha foi redefinida'})

    } catch ( err ) {
      response.status(400).json()
    }
  }
}