import './config/env';
import 'express-async-errors';
import './database/mongoConnection';

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
);

export default app;