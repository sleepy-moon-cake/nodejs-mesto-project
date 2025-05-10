import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import router from './routes';
import errorHandler from './middlewares/error';
import notFoundRoute from './middlewares/not-fount-route';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 4000, DB_URI = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

// routing
app.use(router);
app.use(notFoundRoute);

// error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

(function (): void {
  app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`);
  });

  mongoose.connect(DB_URI).then(() => {
    console.log('Database has been connected');
  });
}());
