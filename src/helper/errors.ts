export interface BaseError extends Error {
  statusCode: number;
}

export class NotFountError extends Error implements BaseError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}
