import { Schema, model, Types } from 'mongoose';

import { ImageType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const imageSchema = new Schema<ImageType>(
  {
    url: { type: String, required: true },
    targetID: {
      type: Types.ObjectId,
      required: true,
      ref: 'Post',
      validate: Validate.postObjectID,
    },
  },
  { versionKey: false },
);

export default model<ImageType>('Image', imageSchema);
