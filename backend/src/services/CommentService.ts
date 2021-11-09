import { Post } from 'src/models';

export default class CommentService {
  static async createComment(data: any, postId: string) {
    return Post.findOneAndUpdate({ _id: postId }, { $push: { comments: data } }, { new: true });
  }

  static async createCommentLike(data: any, postId: string, commentId: string) {
    return Post.findOneAndUpdate(
      { _id: postId, comments: { $elemMatch: { _id: commentId } } },
      { $push: { 'comments.$.likes': { userID: data } } },
      { new: true },
    );
  }

  static async removeComment(postId: string, commentId: string) {
    return Post.findOneAndUpdate(
      { _id: postId, 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true },
    );
  }
}
