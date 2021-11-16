import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { OPENAPIURL, JWT, Query } from 'src/utils';
import { TistoryService } from 'src/services';

@Controller('/socials')
export default class SocialsRouter {
  @Get('/google')
  getGoogle(@Req() request: Request, @Res() response: Response) {
    const { redirect_uri: redirectURIQuery } = request.query;
    const redirectURI: string = (redirectURIQuery as string) || '/';
    passport.authenticate('google', {
      session: false,
      scope: ['profile'],
      state: redirectURI,
    })(request, response);
    return response;
  }

  @Get('/google/callback')
  @UseBefore(passport.authenticate('google', { session: false }))
  @Redirect('/')
  getGoogleCallback(@Req() request: Request, @Res() response: Response) {
    const accessToken = JWT.createAccessToken(request.user!);
    response.cookie('jwt', accessToken, {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
    });
    return `${process.env.CLIENT_URL}${request.query.state}`;
  }

  @Get('/tistory')
  @Redirect('/')
  getTistory(@Req() request: Request, @Res() response: Response) {
    const { redirect_uri: redirectURIQuery } = request.query;
    const redirectURI: string = (redirectURIQuery as string) || '/';
    return `${OPENAPIURL.TISTORY_AUTHORIZATION}?${Query.objectToQuery({
      client_id: process.env.TISTORY_CLIENT_ID,
      redirect_uri: process.env.TISTORY_CALLBACK_URL,
      response_type: 'code',
      state: redirectURI,
    })}`;
  }

  @Get('/tistory/callback')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  @Redirect('/')
  async getTistoryCallback(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    await TistoryService.updateOneUserAccessToken(code as string, request.user!.userID);
    return `${process.env.CLIENT_URL}${request.query.state}`;
  }

  @Get('/tistory/url')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTistoryURL(@Req() request: Request, @Res() response: Response) {
    await TistoryService.updateOneUserURL(request.user!.userID);
    return response.json();
  }

  @Get('/github')
  @UseBefore(passport.authenticate('github', { session: false }))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getGithub() {}

  @Get('/github/callback')
  @UseBefore(passport.authenticate('github', { session: false }))
  @Redirect(`${process.env.CLIENT_URL}`)
  getGithubCallback(@Req() request: Request, @Res() response: Response) {
    const accessToken = JWT.createAccessToken(request.user!);
    response.cookie('jwt', accessToken, {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
    });
  }
}
