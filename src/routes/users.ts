import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createUser,
  getUsers,
  getUserById as getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().required().uri(),
    }),
  }),
  createUser,
);

router.get('/', getUsers);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
    }),
  }),
  updateUser,
);

router.patch(
  '/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateUserAvatar,
);

export default router;
