import { DashboardHistory } from 'src/models';

class DashboardHistoryService {
  async createDashboardHistory(userID: string, content: string, date: string) {
    const history = await DashboardHistory.create({ userID, content, date });
    return history;
  }

  async deleteDashboardHistory(userID: string, historyID: string) {
    return DashboardHistory.deleteOne({ _id: historyID, userID });
  }
}

export default new DashboardHistoryService();
