import {
  model, Types, Schema, Document,
} from 'mongoose';

interface ICard extends Document {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes?: Array<Types.ObjectId>;
  createdAt?: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default model<ICard>('Card', cardSchema);
