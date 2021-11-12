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
  postLikes?: Types.ObjectId[];
  commentLikes?: Types.ObjectId[];
  followers?: Types.ObjectId[];
  follows?: Types.ObjectId[];
  notifyRange?: NotifyRangeType;
  tistoryAccessToken?: string;
  tistoryURL?: string;
  dashboard?: DashboardType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LikeType {
  userID?: Types.ObjectId;
  createdAt?: Date;
}

export interface ImageType {
  _id?: Types.ObjectId;
  url?: string;
  targetID?: Types.ObjectId;
}

export interface PostType {
  _id?: Types.ObjectId;
  title?: string;
  content?: string;
  userID?: Types.ObjectId;
  tags?: Types.ObjectId[];
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostLikeType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  postID?: Types.ObjectId;
  createdAt?: Date;
}

export interface CommentType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  postID?: Types.ObjectId;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentLikeType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  commentID?: Types.ObjectId;
  createdAt?: Date;
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

export interface EchoMessageType {
  _id?: Types.ObjectId;
  roomID?: Types.ObjectId;
  content?: string;
  isRead?: boolean;
  createdAt?: Date;
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
