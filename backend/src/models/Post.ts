import { Schema, model, Types } from 'mongoose';

import { CommentType, PostType, LikeType } from 'src/types/modelType';
import { Validate } from 'src/utils';
import { User, Tag } from 'src/models';

const likeSchema = new Schema<LikeType>(
  {
    userID: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } },
);

const commentSchema = new Schema<CommentType>(
  {
    userID: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: { type: [likeSchema], default: [] },
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
    userID: { type: Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, validate: [Validate.url, 'URL 형식이 잘못되었습니다.'] },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [likeSchema], default: [] },
    tags: { type: [{ type: Types.ObjectId, ref: 'Tag', required: true }], default: [] },
  },
  { versionKey: false, timestamps: true },
);

const Post = model<PostType>('Post', postSchema);
likeSchema.path('userID').validate(Validate.referenceObjectID(User));
commentSchema.path('userID').validate(Validate.referenceObjectID(User));
postSchema.path('userID').validate(Validate.referenceObjectID(User));
postSchema.path('tags').validate(Validate.referenceObjectID(Tag));

export default Post;
