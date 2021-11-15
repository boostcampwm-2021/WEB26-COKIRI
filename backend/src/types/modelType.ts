import { Types } from 'mongoose';

export interface NotifyType {
  _id?: Types.ObjectId;
  type?: 'postLike' | 'postComment' | 'commentLike' | 'follow' | 'follower';
  content?: string;
  userID?: Types.ObjectId;
  postID?: Types.ObjectId;
  createdAt?: Date;
}

export interface NotifyRangeType {
  postLike?: boolean;
  postComment?: boolean;
  commentLike?: boolean;
  follow?: boolean;
  follower?: boolean;
}

export interface DashboardType {
  github: string;
  blog: string;
  solvedac: string;
  email: string;
  profileImage: string;
  jobObjectives: string[];
}

export interface UserType {
  _id?: Types.ObjectId;
  name?: string;
  username?: string;
  githubUsername?: string;
  tistoryAccessToken?: string;
  tistoryURL?: string;
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
  notifyRange?: NotifyRangeType;
  dashboard?: DashboardType;
  lastVisitedAt?: Date;
}

export interface DashboardPostType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DashboardHistoryType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  content?: string;
  date?: Date;
}

export interface FollowType {
  _id?: Types.ObjectId;
  followID?: Types.ObjectId;
  followerID?: Types.ObjectId;
  createdAt?: Date;
  follow?: { _id: Types.ObjectId; username: string; profileImage: string };
  follower?: { _id: Types.ObjectId; username: string; profileImage: string };
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
  type?: 'normal' | 'blog' | 'algorithm' | 'github';
  blog?: 'tistory';
  blogIdentity?: string;
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
  con1?: string;
  con3?: string;
  content?: string;
  count?: number;
}

export interface LanguageType {
  _id?: Types.ObjectId;
  language?: string;
  color?: string;
}
