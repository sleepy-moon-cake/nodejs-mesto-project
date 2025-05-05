export interface BaseError extends Error {
  statusCode: number;
}

export class NotFountError extends Error implements BaseError {
  public statusCode = 404;
}

export class BadRequestEror extends Error implements BaseError {
  public statusCode = 400;
}
