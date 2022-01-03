import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

function isAdmin(request: Request, response: Response, next: NextFunction) {
  const { profile } = request;
  
  if (profile?.role === 1) {
    return next();
  }

  throw new AppError('Admin access denied', 403);
};

export default isAdmin;