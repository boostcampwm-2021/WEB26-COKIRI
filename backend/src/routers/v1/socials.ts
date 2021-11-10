import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { Enums, JWT } from 'src/utils';

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

  @Get('/tistory')
  @Redirect(
    `${Enums.openAPIUrl.TISTORY_AUTHORIZATION_CODE}client_id=${process.env.TISTORY_CLIENT_ID}&redirect_uri=${process.env.TISTORY_CALLBACK_URL}&response_type=code&state=${process.env.TISTORY_STATE}`,
  )
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getTistory() {}

  @Get('/tistory/callback')
  @Redirect(`${process.env.CLIENT_URL}`)
  getTistoryCallback(@Req() request: Request, @Res() response: Response) {
    const { code, state } = request.query;
    if (state !== process.env.TISTORY_STATE) {
      throw new Error(Enums.error.INVALID_TISTORY_STATE);
    }
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
