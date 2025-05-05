import { NextFunction, Request, Response } from 'express';
import { NotFountError } from '../helper/classes/errors';

const notFoundRoute = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFountError('Page not found'));
};

export default notFoundRoute;
