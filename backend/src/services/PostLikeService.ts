import { PostLike } from 'src/models';

class PostLikeService {
  async createPostLike(userID: string, postID: string) {
    return PostLike.updateOne(
      { userID, postID },
      { $setOnInsert: { userID, postID } },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async removePostLike(userID: string, postID: string, likeID: string) {
    return PostLike.remove({ userID, postID, _id: likeID });
  }
}

export default new PostLikeService();
