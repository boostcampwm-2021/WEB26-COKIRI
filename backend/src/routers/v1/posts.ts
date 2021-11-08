import { Request, Response } from 'express';
import { Controller, Req, Res, Post } from 'routing-controllers';

import PostService from 'src/services/PostService';

@Controller('/posts')
export default class PostsRouter {
  @Post('/')
  async postPost(@Req() request: Request, @Res() response: Response) {
    const data = request.body;
    const result = await PostService.createPost(data);
    return response.json(result);
  }
}
