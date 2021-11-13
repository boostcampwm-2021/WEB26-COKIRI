import { PostLike } from 'src/models';
import { Enums } from 'src/utils';

class PostLikeService {
  async createPostLike(userID: string, postID: string) {
    return PostLike.updateOne(
      { userID, postID },
      { $setOnInsert: { userID, postID } },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findPostLikes(postID: string) {
    const likes = await PostLike.find({ postID }, '-postID')
      .populate('user', Enums.select.USER)
      .lean();
    return likes.map((like) => {
      delete like.userID;
      return like;
    });
  }

  async removePostLike(userID: string, postID: string, likeID: string) {
    return PostLike.remove({ userID, postID, _id: likeID });
  }
}

export default new PostLikeService();
