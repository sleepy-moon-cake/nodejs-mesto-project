import { model, ObjectId, Schema } from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes?: Array<ObjectId>;
  createdAt?: Date;
}

const cardSchema = new Schema<ICard>({
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
});

export default model<ICard>('Card', cardSchema);
