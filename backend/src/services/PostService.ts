import { Types } from 'mongoose';

import { Post, User } from 'src/models';
import { PostType } from 'src/types/modelType';
import { ObjectID, MongooseParse } from 'src/utils';
import { ObjectType } from 'src/types';

class PostService {
  async createPost(data: PostType) {
    return Post.create(data);
  }

  async createPostLike(userID: string, postID: string) {
    const likeResult = await User.findOneAndUpdate(
      { _id: userID },
      { $push: { $postLikes: { userID } } },
    );
    if (likeResult) {
      return Post.findOneAndUpdate(
        { _id: postID },
        { $push: { likes: { userID } } },
        { new: true },
      );
    }
    return undefined;
  }

  async findRandomPost() {
    const aggregateResult = await Post.aggregate([
      { $sample: { size: 20 } },
      { $lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'user' } },
      { $lookup: { from: 'comments', localField: '_id', foreignField: 'postID', as: 'comments' } },
      {
        $lookup: { from: 'postlikes', localField: '_id', foreignField: 'postID', as: 'postlikes' },
      },
      { $lookup: { from: 'images', localField: '_id', foreignField: 'targetID', as: 'images' } },
    ]);

    const result = aggregateResult.map((v) => {
      v.likeCount = v.postlikes.length();
      delete v.postlikes;
      v.user = { username: v.user.username, profileImage: v.user.username.profileImage };
      return v;
    });

    return result;
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
      .populate({ path: 'likes.userID', select: 'username profileImage -_id' })
      .lean();
    // const result: any = likesList?.likes?.map((v: any) => ({
    //   ...v.userID,
    //   createdAt: v.createdAt,
    // }));

    return [];
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
