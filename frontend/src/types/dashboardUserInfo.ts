import StackType from './stack';
import HistoryType from './history';
import LanguageStatisticsType from './languageStatistics';

export default interface DashboardUserInfoType {
  _id?: string;
  username: string;
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
  jobObjectives?: string[];
  techStacks?: { [field: string]: StackType[] };
  statistics?: LanguageStatisticsType;
}
