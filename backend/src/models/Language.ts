import { Schema, model } from 'mongoose';

import { LanguageType } from 'src/types';

const LanguageSchema = new Schema<LanguageType>(
  {
    language: { type: String, required: true },
    color: { type: String, required: true },
  },
  { versionKey: false },
);

export default model<LanguageType>('Language', LanguageSchema);
