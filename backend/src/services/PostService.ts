import { Post, User } from 'src/models';
import { PostType } from 'src/types/modelType';

export default class PostService {
  static async createPost(data: PostType) {
    return Post.create(data);
  }

  static async createPostLike(data: string, postID: string) {
    return Post.findOneAndUpdate(
      { _id: postID },
      { $push: { likes: { userID: data } } },
      { new: true },
    );
  }

  static async findRandomPost() {
    return Post.aggregate([{ $sample: { size: 20 } }, { $sort: { createdAt: -1 } }]);
  }

  static async findTimeline(userID: string, offset: string) {
    const followList = await User.findOne({ _id: userID }, 'follows -_id');

    const result = !followList
      ? []
      : Post.find({ userID: { $in: followList.follows } }).populate({
          path: 'userID',
          select: 'username profileImage -_id',
        });
    return result;
  }

  static async findPostLikeList(postID: string) {
    const likesOid = await Post.findOne({ _id: postID }, 'likes -_id');
    const result = (await likesOid?.populate({ path: 'likes' }))?.likes;
    return result;
  }

  static async findPost(postID: string) {
    return Post.findOne({ _id: postID });
  }

  static async removePostLike(postID: string, likeID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, 'likes._id': likeID },
      { $pull: { likes: { _id: likeID } } },
      { new: true },
    );
  }
}
