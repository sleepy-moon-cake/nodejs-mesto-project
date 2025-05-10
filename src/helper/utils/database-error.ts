import { Error as MongooseError } from 'mongoose';

const CONFLICT_MESSAGE_CODE = 'E11000';

export const isCastError = (error: Error): boolean => error.name === MongooseError.CastError.name;

export const isValidationError = (error: Error): boolean => error.name === MongooseError.ValidationError.name;

export const isConflitError = (error: Error): boolean => error instanceof Error && error.message.includes(CONFLICT_MESSAGE_CODE);
