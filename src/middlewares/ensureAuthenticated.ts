import { Request, Response, NextFunction } from 'express';
import jwt, { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends JwtPayload {
    id: string
    role: number
  }
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const token = authHeader.replace('Bearer', '').trim();

  try {
    const decoded = <jwt.UserIDJwtPayload>verify(token, process.env.JWT_SECRET);

    request.user = {
      id: decoded.id,
    }

    request.profile.role = decoded.role

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 403);
  }
}

export default ensureAuthenticated;