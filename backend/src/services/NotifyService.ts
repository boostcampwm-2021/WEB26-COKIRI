import { Notify } from 'src/models';

class NotifyService {
  async createNotify(type: string, senderID: any, userID: any, postID: string | undefined) {
    const data: any = { type, senderID, userID };
    if (postID) {
      data.postID = postID;
    }
    return Notify.create(data);
  }
}

export default new NotifyService();
