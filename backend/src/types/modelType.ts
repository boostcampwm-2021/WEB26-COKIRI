import { Schema } from 'mongoose';

export interface EchoRoomType {
  users: Schema.Types.ObjectId[];
  messages: { userID: Schema.Types.ObjectId; content: string; createdAt: Date }[];
}

import { Schema } from 'mongoose';

export interface LanguageIDType {
  languageID: Schema.Types.ObjectId;
}

export interface PostIDType {
  postID: Schema.Types.ObjectId;
}

export interface UserIDType {
  userID: Schema.Types.ObjectId;
}

export interface NotifyRangeType {
  postLike: boolean;
  postComment: boolean;
  commentLike: boolean;
}

export interface NotifyType extends UserIDType, PostIDType {
  type: 'postLike' | 'postComment' | 'commentLike' | 'follow' | 'follower';
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
  name?: string;
  username?: string;
  profileImage?: string;
  authProvider?: string;
  phoneNumber?: string;
  sex?: string;
  birthday?: Date;
  bio?: string;
  school?: string;
  company?: string;
  region?: string;
  languages?: LanguageIDType[];
  posts?: PostIDType[];
  likes?: PostIDType[];
  followers?: UserIDType[];
  follows?: UserIDType[];
  notifyRange?: NotifyRangeType;
  notifies?: NotifyType[];
  dashboard?: DashboardType;
  versionKey?: boolean;
}

export interface CommentType extends UserIDType {
  content: string;
}

export interface PostType {
  title?: string;
  content?: string;
  userID?: Schema.Types.ObjectId;
  image?: string;
  comments?: CommentType[];
  likes?: UserIDType[];
  tags?: Schema.Types.ObjectId[];
  versionKey?: boolean;
}
