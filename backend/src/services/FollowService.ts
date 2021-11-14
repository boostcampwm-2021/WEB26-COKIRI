import { Follow } from 'src/models';
import { FollowType } from 'src/types';
import { Types } from 'mongoose';

class FollowService {
  async createFollow(followID: string, followerID: string) {
    return Follow.updateOne(
      { followID, followerID },
      { $setOnInsert: { followID, followerID } },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findFollowsID(userID: string) {
    const follows: FollowType[] = await Follow.find({ followerID: userID }, 'followID -_id').lean();
    return follows.map((follow) => follow.followID);
  }

  async findFollowersID(userID: string) {
    const followers: FollowType[] = await Follow.find({ followID: userID }, 'followerID -_id');
    return followers.map((follower) => follower.followerID);
  }

  async countFollows(userID: Types.ObjectId) {
    return Follow.countDocuments({ followerID: userID }).exec();
  }

  async countFollowers(userID: Types.ObjectId) {
    return Follow.countDocuments({ followID: userID }).exec();
  }
}

export default new FollowService();
