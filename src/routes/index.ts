import userRoutes from './users.routes';
import sessionRoutes from './sessions.routes';
import categoryRoutes from './categorys.routes'

import { Router } from 'express';

const routes = Router();

const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/authenticate`, sessionRoutes);
routes.use(`${prefixRoutes}/category`, categoryRoutes);

export default routes;