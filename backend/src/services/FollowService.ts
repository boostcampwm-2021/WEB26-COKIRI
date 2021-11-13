import { Follow } from 'src/models';

class FollowService {
  async findFollows(userID: string) {
    Follow.find({ followerID: userID });
  }

  async findFollowers(userID: string) {
    Follow.find({ followID: userID });
  }
}

export default new FollowService();
