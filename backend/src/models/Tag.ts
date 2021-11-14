import { Schema, model } from 'mongoose';

import { TagType } from 'src/types';

const tagSchema = new Schema<TagType>(
  {
    content: { type: String, required: true },
    con1: { type: String, required: true },
    con3: { type: String, required: true },
    count: { type: Number, default: 0, required: true },
  },
  { versionKey: false },
);

export default model<TagType>('Tag', tagSchema);
