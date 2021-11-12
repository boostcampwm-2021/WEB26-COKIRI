import { Schema, model, Types } from 'mongoose';

import { DashboardHistoryType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const dashboardHistorySchema = new Schema<DashboardHistoryType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    content: { type: String },
    date: { type: Date },
  },
  { versionKey: false },
);

export default model<DashboardHistoryType>('DashboardPost', dashboardHistorySchema);
