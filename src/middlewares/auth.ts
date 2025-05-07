import { Request, Response, NextFunction } from 'express';
import { getTokenPayload } from '../helper/utils/token';
import { UnauthorizedError } from '../helper/classes/errors';
import { JWT_COOKIE_KEY } from '../helper/constants/auth-key';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const { cookies = {} } = req;
  const token = cookies[JWT_COOKIE_KEY];

  if (!token) {
    next(new UnauthorizedError('Unauthorized'));
    return;
  }

  try {
    const payload = getTokenPayload(token);
    (req as any).user = payload;
  } catch {
    next(new UnauthorizedError('Unauthorized'));
  }
  next();
};

export default auth;
