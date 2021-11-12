import { Schema, model, Types } from 'mongoose';

import { DashboardPostType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const dashboardPostSchema = new Schema<DashboardPostType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    title: { type: String },
    content: { type: String },
  },
  { versionKey: false, timestamps: true },
);

export default model<DashboardPostType>('DashboardPost', dashboardPostSchema);
