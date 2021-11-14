import { Follow } from 'src/models';
import { FollowType } from 'src/types';

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
}

export default new FollowService();
