import { DashboardRepository, User } from 'src/models';
import { Calculate, ERROR } from 'src/utils';
import { DashboardRepositoryType, UserType } from 'src/types';

class DashboardRepoService {
  async createDashboardRepo(userID: string, repoData: object) {
    return DashboardRepository.create({ userID, ...repoData });
  }

  async readDashboardRepos(userID: string) {
    return DashboardRepository.find({ userID });
  }

  async readDashboardReposLanguage(userID: string) {
    const result = await User.findOne({ _id: userID }, 'dashboard.statistics.reposLanguage -_id');
    if (!result) {
      throw new Error(ERROR.NOT_EXIST_USER);
    }
    return result?.dashboard?.statistics?.reposLanguage;
  }

  async updateDashboardReposLanguage(userID: string): Promise<UserType | null> {
    const data = await DashboardRepository.find({ userID }, 'languageInfo -_id').lean();
    const temp: { [key: string]: number } = {};
    data.forEach((repo: DashboardRepositoryType) => {
      if (!repo.languageInfo) return;
      Object.entries(repo.languageInfo).forEach((v) => {
        if (Object.prototype.hasOwnProperty.call(temp, v[0])) {
          temp[v[0]] += v[1] as number;
        } else {
          temp[v[0]] = v[1] as number;
        }
      });
    });

    let calculateResult;
    if (Object.keys(temp).length !== 0) {
      calculateResult = Calculate.calculateLanguage(temp);
    } else {
      calculateResult = {};
    }

    return User.findOneAndUpdate(
      { _id: userID },
      { $set: { 'dashboard.statistics.reposLanguage': calculateResult } },
      { new: true },
    );
  }

  async deleteDashboardRepo(userID: string, repoName: string) {
    return DashboardRepository.deleteOne({ userID, repoName });
  }
}

export default new DashboardRepoService();
