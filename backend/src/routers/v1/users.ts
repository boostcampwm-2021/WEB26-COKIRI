import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post, UseBefore } from 'routing-controllers';
import * as passport from 'passport';
import { UserService } from 'src/services';

@Controller('/users')
export default class UsersRouter {
  @Get('/me')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async getAllUsers(@Req() request: Request, @Res() response: Response) {
    const user = await UserService.findOneUserForID({ userID: request.user!.id });
    return response.json({ user });
  }

  @Post('/test')
  getAllPosts(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }
}
