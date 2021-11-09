import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { JWT } from 'src/utils';

@Controller('/socials')
export default class PostsRouter {
  @Get('/google')
  @UseBefore(passport.authenticate('google', { session: false, scope: ['profile'] }))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getGoogle() {}

  @Get('/google/callback')
  @UseBefore(
    passport.authenticate('google', {
      session: false,
    }),
  )
  @Redirect(`${process.env.CLIENT_URL}`)
  getGoogleCallback(@Req() request: Request, @Res() response: Response) {
    const accessToken = JWT.createAccessToken(request.user!);
    response.cookie('jwt', accessToken, {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
    });
  }
}
