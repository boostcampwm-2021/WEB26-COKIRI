export default interface DashboardRepoType {
  content?: string;
  createdAt?: string;
  languageInfo?: { [language: string]: number };
  repoName?: string;
  repoUrl?: string;
  starCount?: number;
  updatedAt?: string;
  userID?: string;
  _id?: string;
}
