import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import UserRouter from './users';
import CardRouter from './cards';
import { createUser, login } from '../controllers/users';
import auth from '../middlewares/auth';

export const router = Router();

router.post(
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

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use('/users', auth, UserRouter);
router.use('/cards', auth, CardRouter);
