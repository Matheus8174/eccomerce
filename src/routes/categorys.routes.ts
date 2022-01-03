import { Router } from 'express';

import CategoryController from '../controllers/categoryController';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.post('/', categoryController.create);

export default categoryRoutes;