import { Post, User, Comment } from 'src/models';

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
