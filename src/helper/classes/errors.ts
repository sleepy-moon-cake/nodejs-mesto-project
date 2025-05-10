export interface BaseError extends Error {
  statusCode: number;
}

export class NotFountError extends Error implements BaseError {
  public statusCode = 404;

  constructor(message = 'Not Found') {
    super(message);
  }
}

export class BadRequestError extends Error implements BaseError {
  public statusCode = 400;

  constructor(message = 'Bad request') {
    super(message);
  }
}

export class UnauthorizedError extends Error implements BaseError {
  public statusCode = 401;

  constructor(message = 'Unauthorized') {
    super(message);
  }
}

export class ForbiddenError extends Error implements BaseError {
  public statusCode = 403;

  constructor(message = 'Forbidden') {
    super(message);
  }
}

export class ConflictError extends Error implements BaseError {
  public statusCode = 409;

  constructor(message = 'Conflict') {
    super(message);
  }
}
