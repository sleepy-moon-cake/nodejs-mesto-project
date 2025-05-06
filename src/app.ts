import express from 'express';
import mongoose from 'mongoose';
import { errors, celebrate, Joi } from 'celebrate';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middlewares/error';
import withTemporaryUser from './middlewares/with-temporary-user';
import notFoundRoute from './middlewares/not-fount-route';
import { createUser, login } from './controllers/users';

const { PORT = 4000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb').then((val) => {
  console.log('Database has been connected');
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routing
app.use(withTemporaryUser);
app.use(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(notFoundRoute);

// error handling
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
