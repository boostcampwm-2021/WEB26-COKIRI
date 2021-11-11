import commentType from './comment';
import WriterType from './writer';
import PostLikeType from './postLike';

export default interface postType {
  _id: string;
  content: string;
  images: string[];
  user: WriterType;
  likeCount: number;
  comments: commentType[];
  createdAt: Date;
  likes: PostLikeType[];
}
