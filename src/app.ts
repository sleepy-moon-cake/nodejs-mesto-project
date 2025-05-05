import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middlewares/error';
import withTemporaryUser from './middlewares/with-temporary-user';

const { PORT = 4000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb').then((val) => {
  console.log('Database has been connected');
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.use(withTemporaryUser);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// error handling
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
