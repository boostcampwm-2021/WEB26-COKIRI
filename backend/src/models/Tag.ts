import { Schema, model } from 'mongoose';
import { TagType } from 'src/types';

const tagSchema = new Schema<TagType>({
  content: { type: String, required: true },
  count: { type: Number, default: 0, required: true },
});

export default model<TagType>('Tag', tagSchema);
