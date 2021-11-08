import { Types } from 'mongoose';

export interface LanguageIDType {
  languageID: Types.ObjectId;
}

export interface PostIDType {
  postID: Types.ObjectId;
}

export interface UserIDType {
  userID: Types.ObjectId;
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
  authProviderID?: string;
  isRegistered?: boolean;
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
  id: Schema.Types.ObjectId;
  content: string;
  likes: UserIDType[];
}

export interface PostType {
  title?: string;
  content?: string;
  userID?: Types.ObjectId;
  image?: string;
  comments?: CommentType[];
  likes?: UserIDType[];
  tags?: Types.ObjectId[];
  versionKey?: boolean;
}

export interface EchoRoomType {
  users: Types.ObjectId[];
  messages: { userID: Types.ObjectId; content: string; createdAt: Date }[];
}

export interface TagType {
  content: string;
  count: number;
}

export interface LanguageType {
  language: string;
  color: string;
}
