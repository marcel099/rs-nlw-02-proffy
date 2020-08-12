import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({msg: 'Token não enviado'})
  }

  try {
    jwt.verify(authHeader, 'secret', {
      maxAge: '24h',
    }, async (err, decoded) => {
      if ( !!err )
        throw(err);
      
      next();
    })
  } catch ( err ) {
    console.error(err)

    return response.status(400)
      .json({
        msg: 'Token inválido',
        err,
      })
  }
}
