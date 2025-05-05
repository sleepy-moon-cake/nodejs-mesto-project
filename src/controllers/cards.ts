import { Request, Response, NextFunction } from 'express';
import { NotFountError } from '../helper/errors';
import Card from '../models/card';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: (req as unknown as any).user.id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFountError(`Card not found with id:${req.params.cardId}`);
      }

      res.send(card);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: (req as unknown as any).user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFountError(`Card not found with id:${req.params.cardId}`);
      }

      res.send(card);
    })
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as unknown as any).user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFountError(`Card not found with id:${req.params.cardId}`);
      }

      res.send(card);
    })
    .catch(() => {
      throw new NotFountError(`Card not found with id:${req.params.cardId}`);
    })
    .catch(next);
};
