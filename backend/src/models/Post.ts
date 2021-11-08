import { Schema, model, Types } from 'mongoose';

import { CommentType, PostType, UserIDType } from 'src/types/modelType';
import { Validate } from 'src/utils';

const likeSchema = new Schema<UserIDType>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

const commentSchema = new Schema<CommentType>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [likeSchema],
      default: [],
    },
  },
  { timestamps: true },
);
const postSchema = new Schema<PostType>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      validate: [Validate.url, 'URL 형식이 잘못되었습니다.'],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    likes: {
      type: [likeSchema],
      default: [],
    },
    tags: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

export default model<PostType>('Post', postSchema);
