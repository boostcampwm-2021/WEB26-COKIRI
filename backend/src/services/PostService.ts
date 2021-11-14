import { Types } from 'mongoose';

import { Post, Image } from 'src/models';
import { MongooseParse, Enums } from 'src/utils';
import { CommentService, PostLikeService } from 'src/services/index';
import ImageService from 'src/services/ImageService';
import FollowService from 'src/services/FollowService';

class PostService {
  async createPost(data: any) {
    let { images } = data;
    const post = await Post.create(data);

    if (images?.length > 0) {
      images = images.map((v: any) => ({
        url: v,
        targetID: post._id,
      }));
      if (images) await Image.insertMany(images);
    }
    return {};
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
    const posts = await Post.find({ userID })
      .populate({ path: 'user', select: Enums.select.USER })
      .lean();
    return Promise.all(
      posts.map(async (post) => {
        delete post.userID;
        const results = await Promise.all([
          CommentService.findComments(post._id!.toString()),
          PostLikeService.findPostLikes(post._id!.toString()),
          ImageService.findPostImage(post._id!.toString()),
        ]);
        return { ...post, comments: results[0], likes: results[1], images: results[2] };
      }),
    );
  }

  async findTimeline(userID: string, offset: string) {
    const follows = await FollowService.findFollowsID(userID);
    const containsArray = !follows ? [userID] : [...follows, userID];
    const posts = await Post.find({ userID: { $in: containsArray } })
      .populate({ path: 'user', select: Enums.select.USER })
      .lean();
    return Promise.all(
      posts.map(async (post) => {
        delete post.userID;
        const results = await Promise.all([
          CommentService.findComments(post._id!.toString()),
          PostLikeService.findPostLikes(post._id!.toString()),
          ImageService.findPostImage(post._id!.toString()),
        ]);
        return { ...post, comments: results[0], likes: results[1], images: results[2] };
      }),
    );
  }

  async findPost(postID: string) {
    const post = await Post.findOne({ _id: postID })
      .populate({
        path: 'user',
        select: Enums.select.USER,
      })
      .lean();
    if (!post) throw new Error(Enums.error.NO_POSTS);
    delete post!.userID;
    return post;
  }

  async findPostCount(userID: Types.ObjectId) {
    return Post.countDocuments({ userID }).exec();
  }
}

export default new PostService();
