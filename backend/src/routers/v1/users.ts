import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post, UseBefore } from 'routing-controllers';
import * as passport from 'passport';
import { UserService } from 'src/services';

@Controller('/users')
export default class UsersRouter {
  @Get('/')
  async getUsersValidUsername(@Req() request: Request, @Res() response: Response) {
    const { username } = request.query;
    if (!username) throw new Error('잘못된 형식의 Query 입니다.');
    return response.json({});
  }

  @Get('/me')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async getUsersMe(@Req() request: Request, @Res() response: Response) {
    const user = await UserService.findOneUserForID({ userID: request.user!.id });
    return response.json({ user });
  }

  @Post('/test')
  getAllPosts(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }
}
