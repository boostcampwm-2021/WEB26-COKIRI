import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post } from 'routing-controllers';

@Controller('/posts')
export default class PostsRouter {
  @Get('/test')
  getAllUsers(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }

  @Post('/test')
  getAllPosts(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }
}
