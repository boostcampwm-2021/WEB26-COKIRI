import { Post, User } from 'src/models';
import { PostType } from 'src/types/modelType';
import { ObjectID, MongooseParse } from 'src/utils';
import { ObjectType } from 'src/types';

class PostService {
  async createPost(data: PostType) {
    return Post.create(data);
  }

  static async createPostLike(userID: string, postID: string) {
    await User.findOneAndUpdate(
      { _id: userID },
      { $push: { $postLikes: { userID } } },
      { new: true },
    );
    return Post.findOneAndUpdate({ _id: postID }, { $push: { likes: { userID } } }, { new: true });
  }

  async findRandomPost() {
    return Post.aggregate([{ $sample: { size: 20 } }, { $sort: { createdAt: -1 } }]);
  }

  async findUserTimeline(userID: string) {
    const posts: ObjectType<any>[] = await Post.find({ userID })
      .populate({ path: 'likes.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'comments.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'comments.likes.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'tags' })
      .populate({ path: 'userID', select: ['username', 'profileImage'] });
    return MongooseParse.convertToPostArrayFormat(posts);
  }

  async findTimeline(userID: string, offset: string) {
    const followList: any = await User.findOne({ _id: userID }, 'follows -_id');
    const containsArray = !followList ? [userID] : [...followList.follows, userID];
    const posts: ObjectType<any>[] = await Post.find({ userID: containsArray })
      .populate({ path: 'likes.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'comments.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'comments.likes.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'tags' })
      .populate({ path: 'userID', select: ['username', 'profileImage'] });
    return MongooseParse.convertToPostArrayFormat(posts);
  }

  async findPostLikeList(postID: string) {
    const likesList = await Post.findOne({ _id: postID }, 'likes -_id')
      .populate({
        path: 'likes.userID',
        select: 'username profileImage -_id',
      })
      .lean();
    const result: any = likesList?.likes?.map((v: any) => ({
      ...v.userID,
      createdAt: v.createdAt,
    }));

    return result;
  }

  async findPost(postID: string) {
    return Post.findOne({ _id: postID });
  }

  async findPostCount(userID: string) {
    const postCount = await Post.aggregate([
      { $match: { userID: ObjectID.stringToObjectID(userID) } },
      { $count: 'postCount' },
    ]);
    if (postCount.length === 0) return { postCount: 0 };
    return postCount[0];
  }

  async removePostLike(postID: string, likeID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, 'likes._id': likeID },
      { $pull: { likes: { _id: likeID } } },
      { new: true },
    );
  }
}

export default new PostService();
