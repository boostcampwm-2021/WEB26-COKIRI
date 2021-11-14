import { Schema, model, Types } from 'mongoose';

import { CommentType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const commentSchema = new Schema<CommentType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    postID: { type: Types.ObjectId, required: true, ref: 'Post', validate: Validate.postObjectID },
    content: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

commentSchema.virtual('user', {
  ref: 'User',
  localField: 'userID',
  foreignField: '_id',
  justOne: true,
});

commentSchema.virtual('post', {
  ref: 'Post',
  localField: 'postID',
  foreignField: '_id',
  justOne: true,
});

export default model<CommentType>('Comment', commentSchema);
