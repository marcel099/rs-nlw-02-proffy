import bcrypt, { hash } from 'bcrypt';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { resolve } from 'node:path';
import { v4 as uuidV4 } from 'uuid';

import { auth } from '@config/auth';
import { db } from '@database/connection';
import { emailProvider } from '@providers/EmailProvider';

export class AuthenticationController {
  async session(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const userFound = await db('users')
        .where('email', '=', email)
        .select('id', 'password')
        .first();

      if (!userFound) {
        return response.status(400).json({
          message: 'E-mail ou senha incorreta',
        });
      }

      const hasPasswordMatched = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!hasPasswordMatched) {
        return response.status(400).json({
          message: 'E-mail ou senha incorreta',
        });
      }

      if (auth.token_secret === undefined) {
        return response.status(500).json({
          message: 'Não foi possível realizar login',
        });
      }

      const token = jwt.sign({}, auth.token_secret, {
        subject: String(userFound.id),
        expiresIn: auth.token_expiration_time,
      });

      return response.json({ token });
    } catch (error) {
      return response.status(400).json({
        message: 'E-mail ou senha incorreta',
      });
    }
  }

  async sendForgottenPasswordEmail(request: Request, response: Response) {
    const { email } = request.body;

    const trx = await db.transaction();

    try {
      const user = await trx('users')
        .where('email', '=', email)
        .select('id')
        .first();

      if (!user) {
        throw new Error();
      }

      const token = uuidV4();

      const expiration_date = dayjs(new Date()).add(3, 'hours').toDate();

      await trx('user_tokens').insert({
        token,
        user_id: user.id,
        expiration_date,
      });

      const templatePath = resolve(
        __dirname,
        '..',
        'shared',
        'views',
        'emails',
        'forgottenPassword.hbs'
      );

      const variables = {
        email,
        link: `${process.env.FRONT_END_WEB_APPLICATION_URL}/reset-password?token=${token}`,
      };

      await emailProvider.sendEmail({
        to: email,
        filePath: templatePath,
        subject: 'Recuperação de senha',
        variables,
      });

      await trx.commit();

      return response.send();
    } catch (error) {
      console.error(error);
      await trx.rollback();

      return response.status(500).json({
        message: 'Erro ao enviar e-mail de redefinição de senha',
      });
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { token } = request.query;
    const { password } = request.body;

    const resetToken = String(token);

    const trx = await db.transaction();

    try {
      const userTokenFound = await trx('user_tokens')
        .where('token', '=', resetToken)
        .select('user_id', 'expiration_date')
        .first();

      if (!userTokenFound) {
        return response.status(400).json({
          message: 'Token inválido',
        });
      }

      const { user_id, expiration_date } = userTokenFound;

      if (dayjs(new Date(expiration_date)).isBefore(new Date())) {
        return response.status(403).json({
          message: 'Token expirado',
        });
      }

      const userFound = await trx('users')
        .where('id', '=', user_id)
        .select('id')
        .first();

      if (!userFound) {
        return response.status(400).json({
          message: 'Usuário inexistente',
        });
      }

      const newPasswordHash = await hash(password, 8);

      await trx('users').where({ id: user_id }).update({
        password: newPasswordHash,
      });

      await trx('user_tokens').where({ user_id }).delete();

      await trx.commit();

      return response.send();
    } catch (error) {
      console.error(error);
      await trx.rollback();

      return response.status(500).json({
        message: 'Erro ao redefinir senha do usuário',
      });
    }
  }
}
