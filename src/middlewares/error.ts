import { NextFunction, Request, Response } from 'express';

import { BaseError } from '../helper/classes/errors';

const errorHandler = (err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  const { message = 'Server error', statusCode = 500 } = err;

  res.status(statusCode);
  res.send({ statusCode, message });
};
export default errorHandler;
