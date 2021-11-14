import { Schema, model, Types } from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import { PostLikeType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const postLikeSchema = new Schema<PostLikeType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    postID: { type: Types.ObjectId, required: true, ref: 'Post', validate: Validate.postObjectID },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  },
);

postLikeSchema.virtual('user', {
  ref: 'User',
  localField: 'userID',
  foreignField: '_id',
  justOne: true,
});

postLikeSchema.virtual('post', {
  ref: 'Post',
  localField: 'postID',
  foreignField: '_id',
  justOne: true,
});

postLikeSchema.plugin(mongooseLeanVirtuals);

export default model<PostLikeType>('PostLike', postLikeSchema);
