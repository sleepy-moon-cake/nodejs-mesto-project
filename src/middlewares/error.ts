import { NextFunction, Request, Response } from 'express';

import { BaseError } from '../helper/errors';

const errorHandler = (err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  const { message, statusCode = 500 } = err;
  res.status(statusCode);
  res.send({ statusCode, error: 'Not Found', message });
};
export default errorHandler;
