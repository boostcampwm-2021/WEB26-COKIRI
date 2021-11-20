import { DashboardRepository } from 'src/models';

class DashboardRepoService {
  async createDashboardRepo(userID: string, repoData: object) {
    return DashboardRepository.create({ userID, ...repoData });
  }

  async readDashboardRepos(userID: string) {
    return DashboardRepository.find({ userID });
  }
}

export default new DashboardRepoService();
