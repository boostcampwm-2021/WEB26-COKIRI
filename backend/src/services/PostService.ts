import { Post } from 'src/models';

export default class PostService {
  static async createPost(data: any) {
    return Post.create(data);
  }

  static async createPostLike(data: any, postId: string) {
    return Post.findOneAndUpdate(
      {
        _id: postId,
      },
      { $push: { likes: { userID: data } } },
      { new: true },
    );
  }

  static async removePostLike(postId: string, likeId: string) {
    return Post.findOneAndUpdate(
      {
        _id: postId,
        'likes._id': likeId,
      },
      { $pull: { likes: { _id: likeId } } },
      { new: true },
    );
  }

  static async findRandomPost() {
    return Post.aggregate([
      {
        $sample: {
          size: 20,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }
}
