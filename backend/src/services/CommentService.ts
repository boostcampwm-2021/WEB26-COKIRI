import { Comment } from 'src/models';
import { ERROR, SELECT } from 'src/utils';
import { CommentLikeService } from 'src/services';
import { CommentType } from 'src/types';

class CommentService {
  async existsComment(postID: string, commentID: string, userID: string | undefined) {
    const isExist = !userID
      ? await Comment.exists({ _id: commentID, postID })
      : await Comment.exists({ _id: commentID, postID, userID });
    if (!isExist) {
      throw new Error(ERROR.NO_COMMENTS);
    }
  }

  async createComment(userID: string, content: string, postID: string) {
    const comment = await Comment.create({ userID, content, postID });
    const newComment = await Comment.findById(comment._id).populate('user', SELECT.USER).lean();
    delete newComment!.userID;
    delete newComment!.postID;
    return newComment;
  }

  async findComments(postID: string) {
    const comments: CommentType[] = await Comment.find({ postID }, '-postID')
      .sort({ createdAt: 1 })
      .populate('user', SELECT.USER)
      .lean();
    return Promise.all(
      comments.map(async (comment) => {
        const newComment = { ...comment };
        delete newComment.userID;
        const likes = await CommentLikeService.findCommentLikes(comment._id!);
        return { ...newComment, likes };
      }),
    );
  }

  async removeComments(postID: string) {
    const comments = await Comment.find({ postID });
    return Promise.all(
      comments.map(async (comment) => {
        await this.removeComment(postID, comment._id);
      }),
    );
  }

  async removeComment(postID: string, commentID: string) {
    return Promise.all([
      Comment.deleteOne({ postID, _id: commentID }),
      CommentLikeService.removeCommentLikes(commentID),
    ]);
  }
}

export default new CommentService();
