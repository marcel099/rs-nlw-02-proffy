import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from './../config/auth';

interface DecodedProps {
  id: string,
}

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({msg: 'Token não enviado'})
  }

  try {
    jwt.verify(authHeader, authConfig.secret, {
      maxAge: authConfig.expire,
    }, (err, decoded: DecodedProps ) => {     // Se ocorrer um conflito entre interfaces atribua o valor any na interface original
      if ( !!err )
        throw(err);
      request.body.user_id = decoded.id;
      return next();
    })
  } catch ( err ) {
    response.status(400);

    let msg;
    switch ( err.message ) {
      case 'invalid signature': 
        msg = 'Sessão com assinatura inválida';
        break;
      case 'maxAge exceeded': 
        msg = 'Sessão expirada';
        break;
      default: 
        msg = 'Token inválido';
    }

    response.json({ msg });
  }
}
