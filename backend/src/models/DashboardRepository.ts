import { Schema, model, Types } from 'mongoose';

import { DashboardRepositoryType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const dashboardRepositorySchema = new Schema<DashboardRepositoryType>(
  {
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    repoName: { type: String, required: true },
    repoUrl: { type: String, required: true },
    starCount: { type: Number },
    forkCount: { type: Number },
    content: { type: String },
    languageInfo: { type: Object },
  },
  { versionKey: false, timestamps: true },
);

export default model<DashboardRepositoryType>('DashboardRepository', dashboardRepositorySchema);
