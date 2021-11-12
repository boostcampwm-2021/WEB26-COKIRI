import { Schema, model, Types } from 'mongoose';

import { PostType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const postSchema = new Schema<PostType>(
  {
    title: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    tags: {
      type: [{ type: Types.ObjectId, ref: 'Tag', required: true, validate: Validate.tagObjectID }],
      default: [],
    },
    link: { type: String, trim: true },
  },
  { versionKey: false, timestamps: true },
);

export default model<PostType>('Post', postSchema);
