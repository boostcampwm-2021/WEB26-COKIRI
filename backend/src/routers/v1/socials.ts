import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { JWT } from 'src/utils';

@Controller('/socials')
export default class SocialsRouter {
  @Get('/google')
  @UseBefore(passport.authenticate('google', { session: false, scope: ['profile'] }))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getGoogle() {}

  @Get('/google/callback')
  @UseBefore(passport.authenticate('google', { session: false }))
  @Redirect(`${process.env.CLIENT_URL}`)
  getGoogleCallback(@Req() request: Request, @Res() response: Response) {
    const accessToken = JWT.createAccessToken(request.user!);
    response.cookie('jwt', accessToken, {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
    });
  }

  @Get('/github')
  @UseBefore(passport.authenticate('github', { session: false }))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getGithub() {}

  @Get('/github/callback')
  @UseBefore(passport.authenticate('github', { session: false }))
  @Redirect(`${process.env.CLIENT_URL}`)
  getGithubCallback(@Req() request: Request, @Res() response: Response) {
    console.log(request.user!);
    response.json({});
  }
}
