import { Types } from 'mongoose';
import { Notify } from 'src/models';

class NotifyService {
  async findNotify(userID: string | Types.ObjectId) {
    return Notify.find({ userID }).sort({ createdAt: -1 });
  }

  async createNotify(
    type: string,
    senderID: string | Types.ObjectId,
    userID: string | Types.ObjectId | undefined,
    postID: string | Types.ObjectId | undefined,
  ) {
    const data = postID ? { type, senderID, userID, postID } : { type, senderID, userID };
    return Notify.create(data);
  }
}

export default new NotifyService();
