import { Schema, model, Types } from 'mongoose';

import { CommentType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const commentSchema = new Schema<CommentType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    postID: { type: Types.ObjectId, required: true, ref: 'Post', validate: Validate.userObjectID },
    content: { type: String, required: true },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

export default model<CommentType>('Comment', commentSchema);
