import LikeType from './like';
import UserType from './user';

export default interface CommentType {
  _id: string;
  content: string;
  user: UserType;
  likes: LikeType;
}
