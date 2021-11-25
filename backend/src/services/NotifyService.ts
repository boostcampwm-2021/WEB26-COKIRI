import { Types } from 'mongoose';
import { Notify } from 'src/models';
import { SELECT } from 'src/utils';

class NotifyService {
  async findNotify(userID: string | Types.ObjectId) {
    const notifies = await Notify.find({ userID })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    return notifies.map((notify) => {
      const temp = { ...notify };
      delete temp.userID;
      delete temp.senderID;
      return temp;
    });
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
