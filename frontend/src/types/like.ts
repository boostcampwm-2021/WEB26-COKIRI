import UserType from './user';

export default interface LikeType {
  _id: string;
  profileImage?: string;
  createdAt: Date;
  user: UserType;
}
