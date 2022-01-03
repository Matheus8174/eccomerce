import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import AppError from '../errors/AppError';

class SessionController {
  public async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (!isPasswordRight) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN
    });

    (user.password as unknown as undefined) = undefined;

    return response
      .cookie('authToken', token, { maxAge: 90000000, httpOnly: true })
      .status(200)
      .json({ user, token });
  }

  public async signout(request: Request, response: Response) {
    return response
      .clearCookie('authToken')
      .status(200)
      .json({ message: 'Signout success' })
  }
}

export default SessionController;