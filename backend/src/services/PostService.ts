import { Types } from 'mongoose';

import { Post, Image } from 'src/models';
import { ERROR, SELECT, PERPAGE, Pipeline } from 'src/utils';
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

  async findRandomPost(userID: any, cursor: number) {
    const randomPosts = await Post.aggregate(Pipeline.randomPosts(userID, cursor, PERPAGE));

    const postCount = await Post.countDocuments({ userID: { $ne: new Types.ObjectId(userID) } });
    return { posts: randomPosts, postCount };
  }

  async findUserTimeline(userID: string, cursor: number) {
    const posts = await Post.aggregate(Pipeline.userTimeline(userID, cursor, PERPAGE));
    const postCount = await Post.countDocuments({ userID });
    return { posts, postCount };
  }

  async findTimeline(userID: string, cursor: number) {
    const follows = await FollowService.findFollowsID(userID);
    const containsArray = !follows ? [userID] : [...follows, new Types.ObjectId(userID)];
    const posts = await Post.aggregate(Pipeline.timeline(containsArray, cursor, PERPAGE));
    const postCount = await Post.countDocuments({ userID: { $in: containsArray } });
    return { posts, postCount };
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
