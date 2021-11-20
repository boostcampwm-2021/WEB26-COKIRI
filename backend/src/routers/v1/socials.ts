import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { OPENAPIURL, JWT, Query, ERROR } from 'src/utils';
import { BlogService, TistoryService, VelogService } from 'src/services';

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
    const cookieOptions = {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
      secure: process.env.MODE !== 'development',
      domain: process.env.MAIN_DOMAIN,
    };
    response.cookie('jwt', accessToken, cookieOptions);
    return `${process.env.CLIENT_URL}${request.query.state}`;
  }

  @Get('/tistory')
  @Redirect('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
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
  @Redirect('/')
  async getTistoryCallback(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    await TistoryService.updateOneUserAccessToken(code as string, request.user!.userID);
    await TistoryService.updateOneUserBlogURL(request.user!.userID);
    return `${process.env.CLIENT_URL}${request.query.state}`;
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
    const cookieOptions = {
      maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
      httpOnly: true,
      secure: process.env.MODE !== 'development',
      domain: process.env.MAIN_DOMAIN,
    };
    response.cookie('jwt', accessToken, cookieOptions);
    return response;
  }

  @Get('/velog')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getVelog(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, blog_username: blogUsername } = request.query;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const isExistsBlog = await BlogService.existsVelogBlog(
      userID as string,
      blogUsername as string,
    );
    return response.json(isExistsBlog);
  }

  @Put('/velog')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putVelog(@Req() request: Request, @Res() response: Response) {
    const { blogUsername, userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const isExistsBlog = await BlogService.existsVelogBlog(userID, blogUsername);
    if (isExistsBlog) {
      throw new Error(ERROR.IS_EXIST_VELOG);
    }
    await VelogService.sendAuthorizationEmail(userID, blogUsername);
    return response.send();
  }

  @Get('/velog/callback')
  async getVelogCallback(@Req() request: Request, @Res() response: Response) {
    const { identity, user_id: userID, token } = request.query;
    let alertMessage;
    if (!identity || !userID || !token) {
      alertMessage = ERROR.INVALID_REQUEST;
    } else {
      alertMessage = await VelogService.compassAuthorization(
        userID as string,
        identity as string,
        token as string,
      );
    }
    return response.send(`<script>alert("${alertMessage}"); window.close();</script > `);
  }
}
