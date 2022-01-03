import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

import Category from '../models/category';

class CategoryController {
  public async create(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    try {
      const newCategory = await Category.create({ name });

      return response.status(201).json(newCategory);
    } catch {
      throw new AppError('failed to create category', 400);
    }
  }
}

export default CategoryController;