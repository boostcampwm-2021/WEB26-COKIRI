import { Schema, model, Types } from 'mongoose';

import { CommentLikeType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const commentLikeSchema = new Schema<CommentLikeType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    commentID: {
      type: Types.ObjectId,
      required: true,
      ref: 'Comment',
      validate: Validate.commentObjectID,
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

export default model<CommentLikeType>('CommentLike', commentLikeSchema);
