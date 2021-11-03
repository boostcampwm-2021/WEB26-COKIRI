import { Schema, model } from 'mongoose';

interface Post {
  title: string;
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
});

export default model<Post>('Post', postSchema);
