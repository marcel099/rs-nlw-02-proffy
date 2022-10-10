import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../shared/config/auth";

interface IPayload {
  sub: string;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  if (auth.token_secret === undefined) {
    return response.status(500)
      .json({
        message: 'Não foi realizar a operação',
      })
  }

  try {
    const { sub: user_id } = verify(token, auth.token_secret) as IPayload;

    request.user = { id: user_id };

    next();
  } catch {
    return response.status(401).json({ message: "Token inválido" });
  }
}
