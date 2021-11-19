import { Types } from 'mongoose';

import { Post, Image } from 'src/models';
import { ERROR, SELECT, PERPAGE } from 'src/utils';
import { CommentService, PostLikeService, TistoryService } from 'src/services/index';
import ImageService from 'src/services/ImageService';
import FollowService from 'src/services/FollowService';
import { PostType } from 'src/types';

class PostService {
  async existsPost(postID: string, userID: string) {
    const isExist = await Post.exists({ _id: postID, userID });
    if (!isExist) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
  }

  async createPost(data: any) {
    let { images } = data;
    const { link, type, external, externalContent } = data;
    const isLinkedPost = link && external && externalContent && !images?.length;
    switch (type) {
      case undefined:
      case 'normal':
        if (isLinkedPost) {
          throw new Error(ERROR.WRONG_BODY_TYPE);
        }
        break;
      case 'blog':
        if (!isLinkedPost && (external.type !== 'tistory' || external.type !== 'velog')) {
          throw new Error(ERROR.WRONG_BODY_TYPE);
        }
        break;
      case 'github':
        if (!isLinkedPost && external.type !== 'github') {
          throw new Error(ERROR.WRONG_BODY_TYPE);
        }
        break;
      case 'algorithm':
        if (!isLinkedPost && external.type !== 'algorithm') {
          throw new Error(ERROR.WRONG_BODY_TYPE);
        }
        break;
      default:
    }
    const post = await Post.create(data);
    if (images?.length > 0) {
      images = images.map((v: any) => ({ url: v, targetID: post._id }));
      if (images) await Image.insertMany(images);
    }
    const newPostConfig = await Promise.all([this.findPost(post._id), this.getPost(post._id)]);
    return { ...newPostConfig[0], ...newPostConfig[1] };
  }

  async getPost(postID: Types.ObjectId) {
    const results = await Promise.all([
      CommentService.findComments(postID.toString()),
      PostLikeService.findPostLikes(postID.toString()),
      ImageService.findPostImage(postID.toString()),
    ]);
    return { comments: results[0], likes: results[1], images: results[2] };
  }

  async getPostArray(posts: PostType[]) {
    return Promise.all(
      posts.map(async (post) => {
        const newPost = { ...post };
        delete newPost.userID;
        const results = await this.getPost(post._id!);
        return { ...newPost, ...results };
      }),
    );
  }

  async findRandomPost() {
    const randomPosts = await Post.aggregate([
      { $sample: { size: PERPAGE } },
      { $sort: { createdAt: -1 } },
      { $lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
    ]);
    return this.getPostArray(randomPosts);
  }

  async findUserTimeline(userID: string) {
    const posts = await Post.find({ userID })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    return this.getPostArray(posts);
  }

  async findTimeline(userID: string, cursor: number) {
    const follows = await FollowService.findFollowsID(userID);
    const containsArray = !follows ? [userID] : [...follows, userID];
    const posts = await Post.find({ userID: { $in: containsArray } })
      .sort({ createdAt: -1 })
      .skip(PERPAGE * cursor)
      .limit(PERPAGE)
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    return this.getPostArray(posts);
  }

  async findPost(postID: string) {
    const post = await Post.findOne({ _id: postID })
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    if (!post) throw new Error(ERROR.NO_POSTS);
    delete post!.userID;
    const results = await Promise.all([
      CommentService.findComments(postID),
      PostLikeService.findPostLikes(postID),
      ImageService.findPostImage(postID),
    ]);
    return { ...post, comments: results[0], likes: results[1], images: results[2] };
  }

  async findPostCount(userID: Types.ObjectId) {
    return Post.countDocuments({ userID }).exec();
  }

  async updateTistoryPost(userID: string, postID: string) {
    const post: PostType = await Post.findOne(
      { _id: postID },
      'external externalContent -_id',
    ).lean();
    if (!post.external || !post.externalContent || post.external.type !== 'tistory') {
      throw new Error(ERROR.INVALID_TISTORY_POST);
    }
    const newBlogContent = await TistoryService.getPostContent(
      userID,
      post.external.identity,
      post.external.target,
    );
    return Post.updateOne(
      { _id: postID },
      {
        title: newBlogContent.title,
        externalContent: newBlogContent.externalContent,
        link: newBlogContent.link,
      },
    );
  }

  async removePost(postID: string) {
    return Promise.all([
      Post.remove({ _id: postID }),
      PostLikeService.removePostLikes(postID),
      ImageService.removePostImage(postID),
      CommentService.removeComments(postID),
    ]);
  }
}

export default new PostService();
