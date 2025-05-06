import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../helper/classes/errors';

export const bearerAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers || {};
  const authType = 'Bearer';

  if (!authorization?.startsWith(authType)) {
    next(new UnauthorizedError('Unauthorized'));
  }
};
