import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, deleteCardById, getCards, likeCard, dislikeCard,
} from '../controllers/cards';

const router = Router();

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);

router.get('/', getCards);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCardById,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeCard,
);

export default router;
