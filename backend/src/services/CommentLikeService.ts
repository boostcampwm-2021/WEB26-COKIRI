import { Types } from 'mongoose';

import { CommentLike } from 'src/models';
import { Enums } from 'src/utils';

class CommentLikeService {
  async createCommentLike(userID: string, commentID: string) {
    const upsertLike = await CommentLike.updateOne(
      { userID, commentID },
      { $setOnInsert: { userID, commentID } },
      { upsert: true, runValidators: true, new: true },
    );
    if (!upsertLike.upsertedId) {
      const likeID = await CommentLike.findOne({ userID, commentID }, '_id').lean();
      return likeID!._id;
    }
    return upsertLike.upsertedId;
  }

  async findCommentLikes(commentID: Types.ObjectId) {
    const likes = await CommentLike.find({ commentID }, '-commentID')
      .populate('user', Enums.select.USER)
      .lean();
    return likes.map((like) => {
      delete like.userID;
      return like;
    });
  }

  async removeCommentLike(commentID: string, likeID: string) {
    return CommentLike.remove({ commentID, likeID });
  }

  async removeCommentLikes(commentID: string) {
    return CommentLike.remove({ commentID });
  }
}

export default new CommentLikeService();
