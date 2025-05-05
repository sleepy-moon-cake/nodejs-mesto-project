import { Response, Request, NextFunction } from 'express';
import { BaseError } from '../helper/errors';

const errorHandler = (err: BaseError, _req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode = 500 } = err;
  res.status(statusCode);
  res.send({ message });
};
export default errorHandler;
