import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

@Controller('/users')
export default class UsersRouter {
  @UseBefore(
    passport.authenticate('jwt', { session: false }, (error, user) => {
      console.log(error, user);
    }),
  )
  @Get('/test')
  getAllUsers(@Req() request: Request, @Res() response: Response) {
    console.log(request.user);
    return response.send('Test!');
  }

  @Post('/test')
  getAllPosts(@Req() request: Request, @Res() response: Response) {
    return response.send('Test!');
  }
}
