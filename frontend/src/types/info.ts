import StackType from './stack';

export interface ProblemInfoType {
  solvedUserCount?: number;
  tear: string;
  totalTryCount: number;
}

export interface RepoInfoType {
  forkCount: number;
  starCount: string;
  language: any;
}

export interface DashboardUserInfoType {
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  school?: string;
  region?: string;
  birthday?: string;
  email?: string;
  bio?: string;
  github?: string;
  blog?: string;
  solvedac?: string;
  jobObjectives?: string[];
  techStacks?: { [field: string]: StackType[] };
}
