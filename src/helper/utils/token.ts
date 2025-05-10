import jwt, { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { SECRET_TOOKEN_KEY } from '../constants/auth-key';

export const generateToken = (userId: Schema.Types.ObjectId): string => jwt.sign({ _id: userId }, SECRET_TOOKEN_KEY, { expiresIn: '7d' });

export const getTokenPayload = (token: string): JwtPayload | string => jwt.verify(token, SECRET_TOOKEN_KEY);
