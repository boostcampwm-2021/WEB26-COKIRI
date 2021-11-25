import UserType from 'src/types/user';

export default interface NotificationType {
  _id: string;
  type: string;
  user: UserType;
  postID?: string;
  createdAt: string;
}
