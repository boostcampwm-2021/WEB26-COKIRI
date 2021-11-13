import { Types } from 'mongoose';

import { CommentLike } from 'src/models';
import { Enums } from 'src/utils';

class CommentLikeService {
  async createCommentLike(userID: string, postID: string, commentID: string) {
    return CommentLike.updateOne(
      { userID, commentID },
      { $setOnInsert: { userID, postID } },
      { upsert: true, runValidators: true, new: true },
    );
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
}

export default new CommentLikeService();
