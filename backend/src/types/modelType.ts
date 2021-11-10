import { Types } from 'mongoose';

export interface NotifyRangeType {
  postLike?: boolean;
  postComment?: boolean;
  commentLike?: boolean;
}

export interface NotifyType {
  _id?: Types.ObjectId;
  type?: 'postLike' | 'postComment' | 'commentLike' | 'follow' | 'follower';
  postID?: Types.ObjectId;
  userID?: Types.ObjectId;
  createdAt?: Date;
}

export interface DashboardType {
  github: string;
  blog: string;
  solvedac: string;
  histories: { date: Date; content: string }[];
  email: string;
  profileImage: string;
  jobObjectives: string[];
}

export interface UserType {
  _id?: Types.ObjectId;
  name?: string;
  username?: string;
  profileImage?: string;
  authProvider?: string;
  authProviderID?: string;
  isRegistered?: boolean;
  phoneNumber?: string;
  sex?: string;
  birthday?: Date;
  bio?: string;
  school?: string;
  company?: string;
  region?: string;
  languages?: Types.ObjectId[];
  likes?: Types.ObjectId[];
  followers?: Types.ObjectId[];
  follows?: Types.ObjectId[];
  notifyRange?: NotifyRangeType;
  dashboard?: DashboardType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LikeType {
  userID?: Types.ObjectId;
  createdAt?: Date;
}

export interface CommentType {
  userID?: Types.ObjectId;
  content?: string;
  likes?: LikeType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostType {
  title?: string;
  content?: string;
  userID?: Types.ObjectId;
  images?: string[];
  comments?: CommentType[];
  likes?: LikeType[];
  tags?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MessageType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  content?: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EchoRoomType {
  _id?: Types.ObjectId;
  users?: Types.ObjectId[];
  messages?: MessageType[];
  updatedAt?: Date;
}

export interface TagType {
  _id?: Types.ObjectId;
  content?: string;
  count?: number;
}

export interface LanguageType {
  _id?: Types.ObjectId;
  language?: string;
  color?: string;
}
