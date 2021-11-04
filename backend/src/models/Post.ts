import { Document, Schema, model } from 'mongoose';

interface Comment extends Document {
  user: Schema.Types.ObjectId;
  content: string;
}
interface Like extends Document {
  user: Schema.Types.ObjectId;
}
interface Post extends Document {
  title: string;
  content: string;
  versionKey: boolean;
  user: Schema.Types.ObjectId;
  image: string;
  comments: Comment[];
  likes: Like[];
  tags: Schema.Types.ObjectId[];
}

const commentSchema = new Schema<Comment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const likeSchema = new Schema<Like>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);
const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
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
    versionKey: false,
  },
  { timestamps: true },
);

export default model<Post>('Post', postSchema);
