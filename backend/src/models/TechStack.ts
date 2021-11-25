import { Schema, model } from 'mongoose';

import { TechStackType } from 'src/types';

const TechStackSchema = new Schema<TechStackType>(
  {
    techStack: { type: String, required: true },
    searchString: { type: String, required: true },
    searchCon: { type: String },
    color: { type: String, required: true },
  },
  { versionKey: false },
);

export default model<TechStackType>('TechStack', TechStackSchema);
