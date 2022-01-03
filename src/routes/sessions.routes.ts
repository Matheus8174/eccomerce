import { Router } from 'express';

import SessionController from '../controllers/sessionController';

const sessionRoutes = Router();

const sessionController = new SessionController();

sessionRoutes.post('/', sessionController.authenticate);
sessionRoutes.get('/signout', sessionController.signout);

export default sessionRoutes;