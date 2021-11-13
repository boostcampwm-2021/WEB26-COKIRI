import commentType from './comment';
import LikeType from './like';
import UserType from './user';

export default interface postType {
  _id: string;
  content: string;
  images: string[];
  user: UserType;
  likeCount: number;
  comments: commentType[];
  createdAt: Date;
  likes: LikeType[];
}
