import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../database/connection';
import { auth } from "../shared/config/auth";

export class AuthenticationController {
  async session(request: Request, response: Response) {
    try {
      const {
        email,
        password,
      } = request.body;

      const userFound = await db('users')
        .where('email', '=', email)
        .select('id', 'password')
        .first();

      if ( !userFound ) {
        return response.status(400).json({
          message: 'E-mail ou senha incorreta'
        })
      }

      const hasPasswordMatched = await bcrypt.compare(
        password,
        userFound.password
      );

      if ( !hasPasswordMatched ) {
        return response.status(400).json({
          message: 'E-mail ou senha incorreta'
        })
      }

      if (auth.token_secret === undefined) {
        return response.status(500)
          .json({
            message: 'Não foi possível realizar login',
          })
      }

      const token = jwt.sign({}, auth.token_secret, {
        subject: String(userFound.id),
        expiresIn: auth.token_expiration_time,
      });

      return response.json({ token });
    } catch ( err ) {
      console.log(err)
      return response.status(400)
        .json({
          message: 'E-mail ou senha incorreta'
        })
    }
  }
}