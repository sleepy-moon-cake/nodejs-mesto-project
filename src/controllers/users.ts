import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { JWT_COOKIE_KEY } from '../helper/constants/auth-key';
import { generateToken } from '../helper/utils/token';
import { databaseErrorHandler } from '../helper/utils/database-error-handler';
import User from '../models/user';
import { NotFountError } from '../helper/classes/errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body || {};

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const token = generateToken(user._id);

        res.status(201);
        res.cookie(JWT_COOKIE_KEY, token, { httpOnly: true, maxAge: 604800 });
        res.send({ message: 'Signup' });
      })
      .catch((err) => databaseErrorHandler(
        err,
        next,
        `Bad request with {name: ${name}, about: ${about}, avatar: ${avatar}, email: ${email},password: ${password}}`,
      ));
  });
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

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = (req as unknown as any).user;
  User.findById(_id)
    .orFail(() => new NotFountError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, 'Bad request'));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body || {};

  const { _id } = (req as unknown as any).user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .orFail(() => new NotFountError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, `Bad request with {name: ${name}, about: ${about}}`));
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body || {};

  const { _id } = (req as unknown as any).user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .orFail(() => new NotFountError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => databaseErrorHandler(err, next, `Bad request with avatar ${avatar}`));
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body || {};

  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotFountError('Password or email is incorrect'))
    .then((user) => bcrypt.compare(password, user.password).then((isPasswordMatched) => {
      if (!isPasswordMatched) {
        throw new NotFountError('Password or email is incorrect');
      }
      return user;
    }))
    .then((user) => {
      const token = generateToken(user._id);

      res.clearCookie(JWT_COOKIE_KEY);
      res.cookie(JWT_COOKIE_KEY, token, { httpOnly: true, maxAge: 604800 });
      res.send({ message: 'Signin' });
    })
    .catch((err) => databaseErrorHandler(err, next, 'Bad request'));
};
