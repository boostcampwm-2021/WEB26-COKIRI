import { Post, Comment } from 'src/models';
import { Enums } from 'src/utils';
import { CommentLikeService } from 'src/services';
import { CommentType } from 'src/types';

class CommentService {
  async existsComment(postID: string, commentID: string) {
    const isExist = await Comment.exists({ postID, _id: commentID });
    if (!isExist) {
      throw new Error(Enums.error.NO_COMMENTS);
    }
  }

  async createComment(userID: string, content: string, postID: string) {
    return Comment.create({ userID, content, postID });
  }

  async findComments(postID: string) {
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

  async removeComment(postID: string, commentID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, 'comments._id': commentID },
      { $pull: { comments: { _id: commentID } } },
      { new: true },
    );
  }

  async removeCommentLike(postID: string, commentID: string, userID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, comments: { $elemMatch: { _id: commentID } } },
      { $pull: { 'comments.$.likes': { userID } } },
      { new: true },
    );
  }
}

export default new CommentService();
