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
    const { images } = data;
    const post = await Post.create(data);
    if (images && images.length !== 0) {
      const insertImages = images.map((imageURL: any) => ({ url: imageURL, targetID: post._id }));
      if (insertImages) await Image.insertMany(insertImages);
    }
    const newPost = await this.findOnePost(post._id);
    return newPost;
  }

  async findPosts(posts: PostType[]) {
    return Promise.all(
      posts.map(async (post) => {
        const newPost = { ...post };
        delete newPost.userID;
        const results = await this.findOnePost(post._id!);
        return { ...newPost, ...results };
      }),
    );
  }

  async findRandomPost(userID: any) {
    const randomPosts = await Post.aggregate([
      { $match: { userID: { $ne: new Types.ObjectId(userID) } } },
      { $sample: { size: PERPAGE } },
      { $sort: { createdAt: -1 } },
      { $lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
    ]);
    return this.findPosts(randomPosts);
  }

  async findUserTimeline(userID: string) {
    const posts = await Post.find({ userID })
      .sort({ createdAt: -1 })
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    return this.findPosts(posts);
  }

  async findTimeline(userID: string, cursor: number) {
    const follows = await FollowService.findFollowsID(userID);
    const containsArray = !follows ? [userID] : [...follows, userID];
    const posts = await Post.find({ userID: { $in: containsArray } })
      .sort({ createdAt: -1 })
      .skip(cursor)
      .limit(PERPAGE)
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    const postCount = await Post.countDocuments({ userID: { $in: containsArray } });
    return { posts: await this.findPosts(posts), postCount };
  }

  async findOnePost(postID: string | Types.ObjectId) {
    const post = await Post.findOne({ _id: postID })
      .populate({ path: 'user', select: SELECT.USER })
      .lean();
    if (!post) throw new Error(ERROR.NOT_EXIST_POST);
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
    const post: PostType = await Post.findOne({ _id: postID }, 'external -_id').lean();
    if (!post.external || post.external.type !== 'tistory') {
      throw new Error(ERROR.INVALID_TISTORY_POST);
    }
    const newBlogContent = await TistoryService.findPostContent(
      userID,
      post.external.identity,
      post.external.target,
    );
    return Post.updateOne({ _id: postID }, { external: newBlogContent });
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
