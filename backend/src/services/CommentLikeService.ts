import { Types } from 'mongoose';

import { CommentLike } from 'src/models';
import { Enums } from 'src/utils';

class CommentLikeService {
  async findCommentLikes(commentID: Types.ObjectId) {
    const likes = await CommentLike.find({ commentID }, '-commentID').populate(
      'user',
      Enums.select.USER,
    );
    return likes.map((like) => {
      delete like.userID;
      return like;
    });
  }
}

export default new CommentLikeService();
