import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from './../database/connection';

export default class LoginController {
  async create(request: Request, response: Response) {
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
        return response.status(400).json({msg: 'Usuário não encontrado'})
      }

      bcrypt.compare(password, userFound.password).then( async (result) => {
        if ( !result ) {
          return response.status(400).json({msg: 'Senha incorreta'})
        }

        return response.json({
          token: jwt.sign({ id: userFound.id }, "secret", {
            expiresIn: '10s',
          })
        })
      });

    } catch ( err ) {
      console.error(err)

      return response.status(400)
        .json({
          msg: 'Falha na autenticação do usuário',
          err,
        })
    }
  }
}

// try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     if (!(await user.compareHash(password))) {
//       return res.status(400).json({ error: "Invalid password" });
//     }

//     return res.json({
//       user,
//       token: user.generateToken()
//     });
//   } catch (err) {
//     return res.status(400).json({ error: "User authentication failed" });
//   }