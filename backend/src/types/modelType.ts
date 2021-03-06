import { Types } from 'mongoose';

export interface NotifyType {
  _id?: Types.ObjectId;
  type?: 'postLike' | 'postComment' | 'commentLike' | 'follow' | 'follower';
  userID?: Types.ObjectId;
  senderID?: Types.ObjectId;
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
  name?: string;
  phoneNumber?: string;
  school?: string;
  region?: string;
  birthday?: Date;
  github?: string;
  blog?: string;
  solvedac?: string;
  email?: string;
  profileImage?: string;
  jobObjectives?: string[];
  techStacks?: object;
  statistics?: {
    problem?: object;
    reposLanguage?: object;
  };
}

export interface UserType {
  _id?: Types.ObjectId;
  name?: string;
  username?: string;
  githubUsername?: string;
  blogAuthentication?: {
    tistory?: string;
    velog?: { token: string; ttl: number; createdAt: Date };
  };
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
  techStacks?: Types.ObjectId[];
  notifyRange?: NotifyRangeType;
  dashboard?: DashboardType;
  lastVisitedAt?: Date;
}

export interface DashboardRepositoryType {
  _id?: Types.ObjectId;
  userID?: Types.ObjectId;
  repoName?: string;
  repoUrl?: string;
  starCount?: number;
  forkCount?: number;
  content?: string;
  languageInfo?: object;
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
  content?: string;
  userID?: Types.ObjectId;
  tags?: Types.ObjectId[];
  external?: {
    title: string;
    content: string;
    link: string;
    info?: object;
    type: 'repository' | 'tistory' | 'velog' | 'problem';
    identity: string;
    target: string;
  };
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

export interface TechStackType {
  _id?: Types.ObjectId;
  techStack?: string;
  searchString?: string;
  searchCon?: string;
  color?: string;
}

export interface BlogType {
  _id?: Types.ObjectId;
  identity?: string;
  url?: string;
  type?: 'tistory' | 'velog';
  userID?: Types.ObjectId;
}
