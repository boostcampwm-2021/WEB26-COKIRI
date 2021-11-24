import StackType from './stack';
import HistoryType from './history';

export default interface DashboardUserInfoType {
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  school?: string;
  region?: string;
  birthday?: string;
  email?: string;
  dashboardHistories?: HistoryType[];
  github?: string;
  blog?: string;
  solvedac?: string;
  jobObjectives?: string[];
  techStacks?: { [field: string]: StackType[] };
}
