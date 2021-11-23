import StackType from './stack';

export interface DashboardReturnType {
  _id: string;
  dashboard: DashboardType;
}

export interface DashboardType {
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  school?: string;
  region?: string;
  birthday?: string;
  email?: string;
  github?: string;
  blog?: string;
  solvedac?: string;
  jobObjectives?: string[];
  techStacks?: { [field: string]: StackType[] };
}
