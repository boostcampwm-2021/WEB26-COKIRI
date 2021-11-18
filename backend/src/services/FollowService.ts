import { Follow } from 'src/models';
import { Types } from 'mongoose';

import { FollowType } from 'src/types';
import { SELECT } from 'src/utils';
import { NotifyService } from 'src/services';

class FollowService {
  async countFollows(userID: Types.ObjectId) {
    return Follow.countDocuments({ followerID: userID }).exec();
  }

  async countFollowers(userID: Types.ObjectId) {
    return Follow.countDocuments({ followID: userID }).exec();
  }

  async createFollow(followID: string, followerID: string) {
    NotifyService.createNotify('follow', followID, followerID, undefined);
    return Follow.updateOne(
      { followID, followerID },
      { $setOnInsert: { followID, followerID } },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findFollowsID(userID: string) {
    const follows: FollowType[] = await Follow.find({ followerID: userID }, 'followID -_id');
    return follows.map((follow) => follow.followID);
  }

  async findFollowersID(userID: string) {
    const followers: FollowType[] = await Follow.find({ followID: userID }, 'followerID -_id');
    return followers.map((follower) => follower.followerID);
  }

  async findFollows(userID: string) {
    const follows: FollowType[] = await Follow.find({ followerID: userID })
      .populate('follow', SELECT.USER)
      .lean();
    return follows.map((follow) => follow.follow);
  }

  async findFollowers(userID: string) {
    const followers: FollowType[] = await Follow.find({ followID: userID })
      .populate('follower', SELECT.USER)
      .lean();
    return followers.map((follower) => follower.follower);
  }

  async removeFollow(followerID: string, followID: string) {
    return Follow.deleteOne({ followerID, followID });
  }
}

export default new FollowService();
