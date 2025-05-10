import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { NotFountError, ForbiddenError, BadRequestError } from '../helper/classes/errors';
import Card from '../models/card';
import { isCastError, isValidationError } from '../helper/utils/database-error';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body || {};

  Card.create({
    name,
    link,
    owner: (req as unknown as any).user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (isValidationError(err) || isCastError(err)) {
        next(new BadRequestError(`Bad request with {name: ${name}, link: ${link} }`));
      } else {
        next(err);
      }
    });
};

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = (req as unknown as any).user;
  Card.findById(req.params.cardId)
    .orFail(() => new NotFountError(`Card not found with id:${req.params.cardId}`))
    .then((card) => {
      const userObjectId = new Types.ObjectId(_id as string);

      if (!card.owner.equals(userObjectId)) {
        throw new ForbiddenError('Fobbined');
      }

      return card.deleteOne().then(() => {
        res.status(204).send();
      });
    })
    .catch((err) => {
      if (isValidationError(err) || isCastError(err)) {
        next(new BadRequestError(`Bad request with cardId ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: (req as unknown as any).user.id } },
    { new: true },
  )
    .orFail(() => new NotFountError(`Card not found with id:${req.params.cardId}`))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (isValidationError(err)) {
        next(new BadRequestError(`Bad request with cardId ${req.params.cardId}`));
      } else {
        next(next);
      }
    });
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as unknown as any).user.id } },
    { new: true },
  )
    .orFail(() => new NotFountError(`Card not found with id:${req.params.cardId}`))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (isValidationError(err) || isCastError(err)) {
        next(new BadRequestError(`Bad request with cardId ${req.params.cardId}`));
      } else {
        next(next);
      }
    });
};
