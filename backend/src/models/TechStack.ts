import { Schema, model } from 'mongoose';

import { TechStackType } from 'src/types';

const TechStackSchema = new Schema<TechStackType>(
  { techStack: { type: String, required: true }, color: { type: String, required: true } },
  { versionKey: false },
);

export default model<TechStackType>('TechStack', TechStackSchema);
