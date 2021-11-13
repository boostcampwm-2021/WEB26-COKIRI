import { PostLike } from 'src/models';

class PostLikeService {
  async createPostLike(userID: string, postID: string) {
    return PostLike.updateOne(
      { userID, postID },
      { $setOnInsert: { userID, postID } },
      { upsert: true, runValidators: true },
    );
  }
}

export default new PostLikeService();
