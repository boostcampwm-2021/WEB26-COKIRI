import { Types } from 'mongoose';

import { Comment, CommentLike } from 'src/models';
import { SELECT, ObjectID } from 'src/utils';
import { NotifyService } from 'src/services';

class CommentLikeService {
  async createCommentLike(userID: string, commentID: string) {
    const upsertLike = await CommentLike.updateOne(
      { userID, commentID },
      { $setOnInsert: { userID, commentID } },
      { upsert: true, runValidators: true, new: true },
    );
    const post = await Comment.findOne({ _id: commentID }, 'userID postID -_id');
    if (post?.userID !== undefined && userID === ObjectID.objectIDToString(post?.userID)) {
      NotifyService.createNotify('commentLike', userID, post?.userID, post?.postID);
    }
    if (!upsertLike.upsertedId) {
      const likeID = await CommentLike.findOne({ userID, commentID }, '_id').lean();
      return likeID!._id;
    }
    return upsertLike.upsertedId;
  }

  async findCommentLikes(commentID: Types.ObjectId) {
    const likes = await CommentLike.find({ commentID }, '-commentID')
      .populate('user', SELECT.USER)
      .lean();
    return likes.map((like) => {
      const newLike = { ...like };
      delete newLike.userID;
      return newLike;
    });
  }

  async removeCommentLike(commentID: string, likeID: string) {
    return CommentLike.deleteOne({ commentID, _id: likeID });
  }

  async removeCommentLikes(commentID: string) {
    return CommentLike.deleteMany({ commentID });
  }
}

export default new CommentLikeService();
