export interface BaseError extends Error {
  statusCode: number;
}

export class NotFountError extends Error implements BaseError {
  public statusCode = 404;
}

export class BadRequestError extends Error implements BaseError {
  public statusCode = 400;
}

export class UnauthorizedError extends Error implements BaseError {
  public statusCode = 401;
}
