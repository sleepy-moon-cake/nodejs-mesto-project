import { Response, Request, NextFunction } from 'express';
import User from '../models/user';
import { NotFountError } from '../helper/errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201);
      res.send({ user });
    })
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFountError(`User not found with id:${userId}`);
      }
      res.send(user);
    })
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  const { id } = (req as unknown as any).user;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  const { id } = (req as unknown as any).user;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
