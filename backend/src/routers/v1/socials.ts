import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

@Controller('/socials')
export default class PostsRouter {
  @Get('/google')
  @UseBefore(passport.authenticate('google', { session: false, scope: ['profile'] }))
  @Get('/google/callback')
  @UseBefore(passport.authenticate('google', { session: false, scope: ['profile'] }))
  @Redirect('/')
  static getGoogleCallback(@Req() request: Request, @Res() response: Response) {
    const token = jwt.sign(request.user!, process.env.JWT_SECRET!, {
      expiresIn: 60 * 60,
    });
    response.cookie('jwt', token);
    return response.redirect('/');
  }
}
