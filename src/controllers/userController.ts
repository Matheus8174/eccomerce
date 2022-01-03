import { Request, Response } from 'express';

import AppError from '../errors/AppError';
import User from '../models/user';

type UserDocument = {
  name: string;
  email: string;
  password: string;
  about: string;
  role: number;
  history?: Array<any>;
};

class UserController {
  public async signup(request: Request, response: Response) {
    const { email, name, password } = request.body;

    const userAlreadyExists = await User.findOne({ email });

    if(userAlreadyExists) {
      throw new AppError('Email already exists', 409);
    }

    try {
      const newUser = await User.create({
        email,
        name,
        password
      });
  
      (newUser.password as unknown as undefined) = undefined;
  
      return response.status(201).json(newUser);
    } catch {
      throw new AppError('failed to create user', 400)
    }
  };

  public async findOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await User.findById(id);

      (user!.password as unknown as undefined) = undefined;

     request.profile = (user as UserDocument);  

      return response.json(user);
    } catch {
      throw new AppError('user not found', 404);
    }
  }
};

export default UserController;