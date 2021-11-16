import { Schema, model, Types } from 'mongoose';

import { BlogType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const blogSchema = new Schema<BlogType>(
  {
    url: { type: String, required: true },
    identity: { type: String, required: true },
    type: { type: String, required: true, enum: ['tistory'] },
    userID: { type: Types.ObjectId, required: true, validate: Validate.userObjectID },
  },
  { versionKey: false, timestamps: false },
);

export default model<BlogType>('Blog', blogSchema);
