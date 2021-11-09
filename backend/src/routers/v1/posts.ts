import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get } from 'routing-controllers';

import { PostService, CommentService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
  @Get('/')
  async getRandomPostOrTimeline(@Req() request: Request, @Res() response: Response) {
    const { type, userID, offset } = request.query;
    if (type === 'random') return response.json(await PostService.findRandomPost());
    return response.json(await PostService.findTimeline(userID, offset));
  }

  @Get('/:postId/likes')
  async getPostLikeList(@Req() request: Request, @Res() response: Response) {
    const { postId } = request.params;
    return response.json(await PostService.findPostLikeList(postId));
  }

  @Get('/:postId')
  async getPost(@Req() request: Request, @Res() response: Response) {
    const { postId } = request.params;
    return response.json(await PostService.findPost(postId));
  }

  @Post('/')
  async postPost(@Req() request: Request, @Res() response: Response) {
    const data = request.body;
    const result = await PostService.createPost(data);
    return response.json(result);
  }

  @Post('/:postId/comments')
  async postComment(@Req() request: Request, @Res() response: Response) {
    const { postId } = request.params;
    const data = request.body;
    const result = await CommentService.createComment(data, postId);
    return response.json(result);
  }

  @Post('/:postId/comments/:commentId/likes')
  async postCommentLike(@Req() request: Request, @Res() response: Response) {
    const { postId, commentId } = request.params;
    const data = request.body;
    const result = await CommentService.createCommentLike(data.userID, postId, commentId);
    return response.json(result);
  }

  @Post('/:postId/likes')
  async postPostLike(@Req() request: Request, @Res() response: Response) {
    const { postId } = request.params;
    const data = request.body;
    const result = await PostService.createPostLike(data.userID, postId);
    return response.json(result);
  }

  @Delete('/:postId/comments/:commentId')
  async deleteComment(@Req() request: Request, @Res() response: Response) {
    const { postId, commentId } = request.params;
    const result = await CommentService.removeComment(postId, commentId);
    return response.json(result);
  }

  @Delete('/:postId/comments/:commentId/likes/:likeId')
  async deleteCommentLike(@Req() request: Request, @Res() response: Response) {
    const { postId, commentId, likeId } = request.params;
    const result = await CommentService.removeCommentLike(postId, commentId, likeId);
    return response.json(result);
  }

  @Delete('/:postId/likes/:likeId')
  async deletePostLike(@Req() request: Request, @Res() response: Response) {
    const { postId, likeId } = request.params;
    const result = await PostService.removePostLike(postId, likeId);
    return response.json(result);
  }
}
