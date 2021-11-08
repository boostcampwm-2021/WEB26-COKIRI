import { Post } from 'src/models';

export default class CommentService {
  static async createComment(data: any, postId: string) {
    return Post.findOneAndUpdate(
      {
        _id: postId,
      },
      { $push: { comments: data } },
      { new: true },
    );
  }
}
