import { Schema, model, Types } from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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

followSchema.virtual('follow', {
  ref: 'User',
  localField: 'followID',
  foreignField: '_id',
  justOne: true,
});

followSchema.virtual('follower', {
  ref: 'User',
  localField: 'followerID',
  foreignField: '_id',
  justOne: true,
});

followSchema.plugin(mongooseLeanVirtuals);

export default model<FollowType>('Follow', followSchema);
