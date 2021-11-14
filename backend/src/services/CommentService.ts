import { Comment } from 'src/models';
import { Enums } from 'src/utils';
import { CommentLikeService } from 'src/services';
import { CommentType } from 'src/types';

class CommentService {
  async existsComment(userID: string, postID: string, commentID: string) {
    const isExist = await Comment.exists({ _id: commentID, postID, userID });
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
        delete comment.userID;
        const likes = await CommentLikeService.findCommentLikes(comment._id!);
        return { ...comment, likes };
      }),
    );
  }

  async removeComment(postID: string, commentID: string) {
    return Comment.remove({ postID, _id: commentID });
  }
}

export default new CommentService();
