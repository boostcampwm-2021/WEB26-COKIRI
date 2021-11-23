import { DashboardRepository, User } from 'src/models';
import { Calculate } from 'src/utils';

class DashboardRepoService {
  async createDashboardRepo(userID: string, repoData: object) {
    return DashboardRepository.create({ userID, ...repoData });
  }

  async readDashboardRepos(userID: string) {
    return DashboardRepository.find({ userID });
  }

  async updateDashboardReposLanguage(userID: string) {
    const data = await DashboardRepository.find({ userID }, 'languageInfo -_id').lean();
    const temp: any = {};
    data.forEach((repo: any) => {
      Object.entries(repo.languageInfo).forEach((v) => {
        if (Object.prototype.hasOwnProperty.call(temp, v[0])) {
          temp[v[0]] += v[1] as number;
        } else {
          temp[v[0]] = v[1] as number;
        }
      });
    });
    const calculateResult = Calculate.calculateLanguage(temp);

    return User.updateOne(
      { _id: userID },
      { $setOnInsert: { 'statistics.reposLanguage': calculateResult } },
      { upsert: true, new: true },
    );
  }
}

export default new DashboardRepoService();
