import commentType from './comment';
import LikeType from './like';
import UserType from './user';
import ImageType from './image';

export default interface postType {
  _id?: string;
  content?: string;
  images?: ImageType[];
  user?: UserType;
  likeCount?: number;
  comments?: commentType[];
  createdAt?: Date;
  likes?: LikeType[];
}
