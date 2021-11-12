import { Schema, model, Types } from 'mongoose';

import { PostLikeType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const postLikeSchema = new Schema<PostLikeType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    postID: { type: Types.ObjectId, required: true, ref: 'Post', validate: Validate.userObjectID },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

export default model<PostLikeType>('PostLike', postLikeSchema);
