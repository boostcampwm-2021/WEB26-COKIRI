import { Request, Response } from 'express';
import { Controller, Req, Res, Post } from 'routing-controllers';

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
}
