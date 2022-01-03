import { Router } from 'express';

import UserController from '../controllers/userController';

import UserValidator from '../validators/userValidator';

import requestValidate from '../middlewares/requestValidate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import isAdmin from '../middlewares/isAdmin';

const userRoutes = Router();

const userValidator = new UserValidator();
const userController = new UserController();

userRoutes.post('/', userValidator.signup(), requestValidate, userController.signup);
userRoutes.get('/:id', ensureAuthenticated, isAdmin, userController.findOne);

export default userRoutes;