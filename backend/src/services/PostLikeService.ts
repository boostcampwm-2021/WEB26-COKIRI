import { PostLike } from 'src/models';
import { Enums } from 'src/utils';

class PostLikeService {
  async createPostLike(userID: string, postID: string) {
    const upsertLike = await PostLike.updateOne(
      { userID, postID },
      { $setOnInsert: { userID, postID } },
      { upsert: true, runValidators: true, new: true },
    );
    if (!upsertLike.upsertedId) {
      const likeID = await PostLike.findOne({ userID, postID }, '_id').lean();
      return likeID!._id;
    }
    return upsertLike.upsertedId;
  }

  async findPostLikes(postID: string) {
    const likes = await PostLike.find({ postID }, '-postID')
      .populate('user', Enums.select.USER)
      .lean();
    return likes.map((like) => {
      const newLike = { ...like };
      delete newLike.userID;
      return newLike;
    });
  }

  async removePostLike(userID: string, postID: string, likeID: string) {
    return PostLike.remove({ _id: likeID, userID, postID });
  }
}

export default new PostLikeService();
