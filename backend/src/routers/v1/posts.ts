import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete } from 'routing-controllers';

import { PostService, CommentService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
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
    const result = await CommentService.createPostLike(data.userID, postId);
    return response.json(result);
  }

  @Delete('/:postId/likes/:likeId')
  async deletePostLike(@Req() request: Request, @Res() response: Response) {
    const { postId, likeId } = request.params;
    const result = await CommentService.removePostLike(postId, likeId);
    return response.json(result);
  }
}
