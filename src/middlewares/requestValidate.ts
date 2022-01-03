import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import AppError from '../errors/AppError';

function requestValidate (
  request: Request, 
  response: Response, 
  next: NextFunction
): void {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array()
    .map(error => ({[error.param]: error.msg }));

  const errorFormated = Object.assign({}, ...extractedErrors);

  throw new AppError(errorFormated, 422);
}


export default requestValidate;