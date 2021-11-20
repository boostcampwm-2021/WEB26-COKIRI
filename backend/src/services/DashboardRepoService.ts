import { DashboardRepository } from 'src/models';
import { ERROR } from 'src/utils';
import { GitService } from 'src/services';

class DashboardRepoService {
  async createDashboardRepo(userID: string, repoData: object) {
    return DashboardRepository.create({ userID, ...repoData });
  }
}

export default new DashboardRepoService();
