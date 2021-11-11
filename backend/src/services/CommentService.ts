import { Post, User } from 'src/models';

export default class CommentService {
  static async createComment(data: any, postID: string) {
    return Post.findOneAndUpdate({ _id: postID }, { $push: { comments: data } }, { new: true });
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
