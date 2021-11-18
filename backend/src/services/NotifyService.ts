import { Types } from 'mongoose';
import { Notify } from 'src/models';

class NotifyService {
  async createNotify(
    type: string,
    senderID: string | Types.ObjectId,
    userID: string | Types.ObjectId,
    postID: string | Types.ObjectId,
  ) {
    const data = postID ? { type, senderID, userID, postID } : { type, senderID, userID };
    return Notify.create(data);
  }
}

export default new NotifyService();
