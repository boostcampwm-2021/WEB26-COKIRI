import { Types } from 'mongoose';

import { DashboardHistory } from 'src/models';

class DashboardHistoryService {
  async createDashboardHistory(userID: string, content: string, date: string) {
    const history = await DashboardHistory.create({ userID, content, date });
    return history;
  }

  async findDashboardHistory(userID: string | Types.ObjectId) {
    return DashboardHistory.find({ userID }).sort({ date: 1 }).lean();
  }

  async deleteDashboardHistory(userID: string, historyID: string) {
    return DashboardHistory.deleteOne({ _id: historyID, userID });
  }
}

export default new DashboardHistoryService();
