import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post } from 'routing-controllers';

@Controller('/users')
export default class UsersRouter {
  @Get('/test')
  static getAllUsers(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }

  @Post('/test')
  static getAllPosts(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }
}
