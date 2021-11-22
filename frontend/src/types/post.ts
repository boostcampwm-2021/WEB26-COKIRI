import CommentType from './comment';
import LikeType from './like';
import UserType from './user';
import ImageType from './image';
import ExternalType from './external';

export default interface PostType {
  _id?: string;
  type?: string;
  content?: string;
  images?: ImageType[];
  user?: UserType;
  likeCount?: number;
  comments?: CommentType[];
  createdAt?: string;
  likes?: LikeType[];
  nextCursor?: number;
  external?: ExternalType;
}
