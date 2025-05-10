import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { router } from './routes';
import auth from './middlewares/auth';
import errorHandler from './middlewares/error';
import notFoundRoute from './middlewares/not-fount-route';

const { PORT = 4000 } = process.env;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routing
app.use(router);
app.use(notFoundRoute);

// error handling
app.use(errors());
app.use(errorHandler);

(function (): void {
  app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`);
  });

  mongoose.connect('mongodb://localhost:27017/mestodb').then((val) => {
    console.log('Database has been connected');
  });
}());
