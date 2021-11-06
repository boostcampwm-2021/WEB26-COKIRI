import { Document, Schema, model } from 'mongoose';

interface Comment extends Document {
  userID: Schema.Types.ObjectId;
  content: string;
}
interface Like extends Document {
  userID: Schema.Types.ObjectId;
}
interface Post extends Document {
  title: string;
  content: string;
  versionKey: boolean;
  userID: Schema.Types.ObjectId;
  image: string;
  comments: Comment[];
  likes: Like[];
  tags: Schema.Types.ObjectId[];
}

const commentSchema = new Schema<Comment>(
  {
    userID: {
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
    userID: {
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
      validate: [
        function urlValidated(image: string) {
          const urlRegx =
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
          return urlRegx.test(image);
        },
        'URL 형식이 잘못되었습니다.',
      ],
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
