import { Schema, model, Types } from 'mongoose';

import { FollowType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const followSchema = new Schema<FollowType>(
  {
    followID: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
      validate: Validate.userObjectID,
    },
    followerID: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
      validate: Validate.userObjectID,
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

export default model<FollowType>('Follow', followSchema);
