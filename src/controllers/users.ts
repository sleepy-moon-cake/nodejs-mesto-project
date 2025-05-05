import { Response, Request, NextFunction } from 'express';
import { databaseErrorHandler } from '../helper/utils/database-error-handler';
import User from '../models/user';
import { NotFountError } from '../helper/classes/errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body || {};

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201);
      res.send({ user });
    })
    .catch((err) => databaseErrorHandler(
      err,
      next,
      `Bad request with {name: ${name}, about: ${about}, avatar: ${avatar}}`,
    ));
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFountError(`User not found with id:${userId}`))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, 'Bad request'));
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => databaseErrorHandler(err, next, 'Bad request'));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body || {};

  const { id } = (req as unknown as any).user;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail(() => new NotFountError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, `Bad request with {name: ${name}, about: ${about}}`));
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body || {};

  const { id } = (req as unknown as any).user;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(() => new NotFountError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, `Bad request with avatar ${avatar}`));
};
