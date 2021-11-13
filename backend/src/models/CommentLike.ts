import { Schema, model, Types } from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  },
);

commentLikeSchema.virtual('user', {
  ref: 'User',
  localField: 'userID',
  foreignField: '_id',
  justOne: true,
});

commentLikeSchema.plugin(mongooseLeanVirtuals);

export default model<CommentLikeType>('CommentLike', commentLikeSchema);
