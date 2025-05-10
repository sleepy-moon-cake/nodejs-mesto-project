import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      validate: isEmail,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.index({ email: 1 }, { unique: true });

export default model<IUser>('User', userSchema);
