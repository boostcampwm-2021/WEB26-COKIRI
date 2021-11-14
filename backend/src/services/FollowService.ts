import { Follow } from 'src/models';

class FollowService {
  async createFollow(followID: string, followerID: string) {
    return Follow.updateOne(
      { followID, followerID },
      { $setOnInsert: { followID, followerID } },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findFollows(userID: string) {
    return Follow.find({ followerID: userID });
  }

  async findFollowers(userID: string) {
    return Follow.find({ followID: userID });
  }
}

export default new FollowService();
