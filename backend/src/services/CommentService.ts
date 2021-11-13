import { Post, User, Comment, CommentLike } from 'src/models';
import { Enums } from 'src/utils';
import { CommentLikeService } from 'src/services';
import { CommentType } from 'src/types';

export default class CommentService {
  static async createComment(userID: string, content: string, postID: string) {
    return Comment.create({ userID, content, postID });
  }

  static async createCommentLike(userID: string, postID: string, commentID: string) {
    const likeResult = await User.findOneAndUpdate(
      { _id: userID },
      { $push: { $commentLikes: { userID } } },
    );
    if (likeResult) {
      return Post.findOneAndUpdate(
        { _id: postID, comments: { $elemMatch: { _id: commentID } } },
        { $push: { 'comments.$.likes': { userID } } },
        { new: true },
      );
    }
    return undefined;
  }

  static async findComments(postID: string) {
    const comments: CommentType[] = await Comment.find({ postID }, '-postID')
      .populate('user', Enums.select.USER)
      .lean();
    return Promise.all(
      comments.map(async (comment) => {
        const likes = await CommentLikeService.findCommentLikes(comment._id!);
        return { ...comment, likes };
      }),
    );
  }

  static async removeComment(postID: string, commentID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, 'comments._id': commentID },
      { $pull: { comments: { _id: commentID } } },
      { new: true },
    );
  }

  static async removeCommentLike(postID: string, commentID: string, userID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, comments: { $elemMatch: { _id: commentID } } },
      { $pull: { 'comments.$.likes': { userID } } },
      { new: true },
    );
  }
}
