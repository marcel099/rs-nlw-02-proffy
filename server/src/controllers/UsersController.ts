import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import mailer from './../utils/mailer';

import db from './../database/connection';

class UsersController {

  hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async index(request: Request, response: Response) {
    const users = await db('users');

    return response.json(users);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const {
      email,
      password,
    } = request.body;

    try {
      if ( !email || !password ) {
        return response.status(400).json({ msg: 'Campos não informados para criar usuário' })
      }

      const encryptedPassword = await this.hashPassword(password)

      if ( !encryptedPassword )    //? Não garanto que isso capta quando ocorre erro
        return response.status(500).json({msg: 'Erro na criptografação da senha.'})

      await db('users').insert({
        email,
        password: encryptedPassword,
      })

      return response.status(201).json()

      // then( async ( encryptedPassword ) => {
      //   await db('users').insert({
      //     email,
      //     password: encryptedPassword,
      //   })
        
      //   return response.status(201).json()
      // }).catch( err => {
      //   return response.status(500).json({msg: 'Erro na criptografação da senha.'})
      // })
    } catch ( err ) {
      return response.status(500).json({msg: 'Erro ao cadastrar usuário'})
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      if ( !email ) {
        return response.status(400).json({ msg: 'E-mail não informado' })
      }

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

      await db('users')
        .where('id', '=', userFound.id)
        .update({
          password_reset_token: token,
          password_reset_expires: expires,
        })

      mailer.sendMail({
        to: email,
        from: 'support@proffy.com',
        html: `<p>Você esqueceu sua senha? Não tem problema, clique <a href="http://localhost:3000/reset-password?token=${token}&email=${email}" target="_blank">aqui</a> para escolher a sua nova senha.</p>`,
      }, (err) => {
        if (!!err)
          return response.status(500).json({msg: 'Não foi possível enviar o e-mail de recuperação de senha'})
        
        return response.json({msg: 'E-mail de recuperação enviado com sucesso!<br/>Por favor, verifique o e-mail na sua caixa de entrada'})
      })

    } catch ( err ) {
      return response.status(500).json({msg: 'Erro ao enviar e-mail de recuperação de senha'})
    }
  }

  async resetPassword(request: Request, response: Response, next: NextFunction) {
    const { 
      password,
      repeated_password,
    } = request.body;

    const {
      email,
      token,
    } = request.query

    try {      
      if ( !email || !token || !password || !repeated_password ) {
        return response.status(400).json({ msg: 'Campos não informados' })
      }

      if (password !== repeated_password) {
        return response.status(400).json({msg: 'As senhas são diferentes'})
      }

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

      const now = new Date().getTime()
      if (now > userFound.password_reset_expires) {
        return response.status(400).json({msg: 'Token expirado. Tente novamente.'})
      }

      const encryptedPassword = await this.hashPassword(password)

      if ( !encryptedPassword )    //? Não garanto que isso capta quando ocorre erro
        return response.status(500).json({msg: 'Erro na criptografação da senha.'})

      await db('users')
        .where('id', '=', userFound.id)
        .update({
          password: encryptedPassword,
          password_reset_token: null,
          password_reset_expires: null,
        })

      response.json({msg: 'Sua senha foi redefinida'})

    } catch ( err ) {
      return response.status(500).json({msg: 'Erro ao redefinir a senha'})
    }
  }
}

export default UsersController;
