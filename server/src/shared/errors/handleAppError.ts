import { NextFunction, Request, Response } from 'express';

import { AppError } from './AppError';

export function handleAppError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err.message);
  console.log(err.name);

  return response.status(500).json({
    status: 'error',
    message: `Internal server error`,
  });
}
