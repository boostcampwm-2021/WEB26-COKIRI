import { Request, Response } from 'express';
import { JsonController, Req, Post, Delete, Get } from 'routing-controllers';

import { PostService, CommentService } from 'src/services';

@JsonController('/posts')
export default class PostsRouter {
  @Post('/')
  async postPost(@Req() request: Request) {
    const data = request.body;
    const result = await PostService.createPost(data);
    return result;
  }

  @Post('/:postId/comments')
  async postComment(@Req() request: Request) {
    const { postId } = request.params;
    const data = request.body;
    const result = await CommentService.createComment(data, postId);
    return result;
  }

  @Post('/:postId/comments/:commentId/likes')
  async postCommentLike(@Req() request: Request) {
    const { postId, commentId } = request.params;
    const data = request.body;
    const result = await CommentService.createCommentLike(data.userID, postId, commentId);
    return result;
  }

  @Post('/:postId/likes')
  async postPostLike(@Req() request: Request) {
    const { postId } = request.params;
    const data = request.body;
    const result = await PostService.createPostLike(data.userID, postId);
    return result;
  }

  @Delete('/:postId/likes/:likeId')
  async deletePostLike(@Req() request: Request) {
    const { postId, likeId } = request.params;
    const result = await PostService.removePostLike(postId, likeId);
    return result;
  }

  @Get('posts')
  async getRandomPost(@Req() request: Request) {
    const { type } = request.query;
    let result;
    if (type === 'random') result = PostService;
    return result;
  }
}
