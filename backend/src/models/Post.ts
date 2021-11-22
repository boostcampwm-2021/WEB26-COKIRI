import { Schema, model, Types } from 'mongoose';
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import { PostType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const postSchema = new Schema<PostType>(
  {
    title: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    tags: {
      type: [{ type: Types.ObjectId, ref: 'Tag', required: true, validate: Validate.tagObjectID }],
      default: [],
    },
    type: {
      type: String,
      enum: ['normal', 'github', 'blog', 'algorithm'],
      required: true,
      default: 'normal',
    },
    external: {
      content: { type: String, trim: true, require: true },
      link: { type: String, trim: true },
      info: Object,
      type: { type: String, enum: ['github', 'tistory', 'velog'] },
      identity: { type: String, trim: true },
      target: { type: String, trim: true },
    },
  },
  { versionKey: false, timestamps: true },
);

postSchema.virtual('user', {
  ref: 'User',
  localField: 'userID',
  foreignField: '_id',
  justOne: true,
});

postSchema.plugin(mongooseLeanVirtuals);

export default model<PostType>('Post', postSchema);
