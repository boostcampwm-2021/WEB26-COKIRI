import { Types } from 'mongoose';

import { Post, User } from 'src/models';
import { PostType } from 'src/types/modelType';
import { ObjectID } from 'src/utils';

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

  static async findUserTimeline(userID: string) {
    const posts = await Post.find({ userID })
      .populate({ path: 'likes.userID', select: ['username', 'profileImage'] })
      .populate({ path: 'comments' })
      .populate({ path: 'tags' })
      .populate({ path: 'userID', select: ['username', 'profileImage'] });
    console.log(posts);
    return posts;
  }

  static async findTimeline(userID: string, offset: string) {
    const followList = await User.findOne({ _id: userID }, 'follows -_id');

    const result = !followList
      ? []
      : Post.aggregate([
          { $match: { userID: { $in: followList.follows } } },
          {
            $lookup: {
              from: 'users',
              let: { id: '$userID' },
              pipeline: [{ $project: { username: 1, profileImage: 1 } }],
              as: 'user',
            },
          },
          { $unwind: { path: '$user' } },
          { $project: { userID: 0 } },
        ]);
    return result;
  }

  static async findPostLikeList(postID: string) {
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

  static async findPost(postID: string) {
    return Post.findOne({ _id: postID });
  }

  static async findPostCount(userID: string) {
    const postCount = await Post.aggregate([
      { $match: { userID: ObjectID.stringToObjectID(userID) } },
      { $count: 'postCount' },
    ]);
    if (postCount.length === 0) return { postCount: 0 };
    return postCount[0];
  }

  static async removePostLike(postID: string, likeID: string) {
    return Post.findOneAndUpdate(
      { _id: postID, 'likes._id': likeID },
      { $pull: { likes: { _id: likeID } } },
      { new: true },
    );
  }
}
