import { NextFunction } from 'express';
import { Error } from 'mongoose';
import { BadRequestEror } from '../classes/errors';

export const databaseErrorHandler = (error: Error, next: NextFunction, message: string) => {
  if (error.name === Error.CastError.name || error.name === Error.ValidationError.name) {
    next(new BadRequestEror(message));
  } else {
    next(error);
  }
};
