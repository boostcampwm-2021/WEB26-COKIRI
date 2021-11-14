import { Types } from 'mongoose';

import { Post, User, Image } from 'src/models';
import { MongooseParse, Enums } from 'src/utils';
import { ObjectType } from 'src/types';
import { CommentService, PostLikeService } from 'src/services/index';
import ImageService from 'src/services/ImageService';

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
      .populate({ path: 'likes.userID', select: Enums.select.USER })
      .lean();
    // const result: any = likesList?.likes?.map((v: any) => ({
    //   ...v.userID,
    //   createdAt: v.createdAt,
    // }));

    return [];
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
