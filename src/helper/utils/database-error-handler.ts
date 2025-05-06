import { NextFunction } from 'express';
import { Error } from 'mongoose';
import { BadRequestError } from '../classes/errors';

export const databaseErrorHandler = (error: Error, next: NextFunction, message: string) => {
  if (error.name === Error.CastError.name || error.name === Error.ValidationError.name) {
    next(new BadRequestError(message));
  } else {
    next(error);
  }
};
