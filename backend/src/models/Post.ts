import { Schema, model, Types } from 'mongoose';

import { CommentType, PostType, LikeType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const likeSchema = new Schema<LikeType>(
  {
    userID: { type: Types.ObjectId, ref: 'User', required: true, validate: Validate.userObjectID },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } },
);

const commentSchema = new Schema<CommentType>(
  {
    userID: { type: Types.ObjectId, ref: 'User', required: true, validate: Validate.userObjectID },
    content: { type: String, required: true },
    likes: { type: [likeSchema], default: [] },
  },
  { timestamps: true },
);

const postSchema = new Schema<PostType>(
  {
    title: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    userID: { type: Types.ObjectId, required: true, ref: 'User', validate: Validate.userObjectID },
    images: { type: String, validate: Validate.url },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [likeSchema], default: [] },
    tags: {
      type: [{ type: Types.ObjectId, ref: 'Tag', required: true, validate: Validate.tagObjectID }],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

export default model<PostType>('Post', postSchema);
