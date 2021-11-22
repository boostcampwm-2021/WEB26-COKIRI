import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { OPENAPIURL, JWT, Query, ERROR, RESPONSECODE } from 'src/utils';
import { BlogService, TistoryService, UserService, VelogService } from 'src/services';

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
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  getTistory(@Req() request: Request, @Res() response: Response) {
    const { redirect_uri: redirectURIQuery } = request.query;
    const redirectURI: string = (redirectURIQuery as string) || '/';
    return response.json({
      code: RESPONSECODE.SUCCESS,
      data: `${OPENAPIURL.TISTORY_AUTHORIZATION}?${Query.objectToQuery({
        client_id: process.env.TISTORY_CLIENT_ID,
        redirect_uri: process.env.TISTORY_CALLBACK_URL,
        response_type: 'code',
        state: redirectURI,
      })}`,
    });
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
  getGithub(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID } = request.query;
    passport.authenticate('github', {
      session: false,
      state: userID as string,
    })(request, response);
    return response;
  }

  @Get('/github/callback')
  @UseBefore(passport.authenticate('github', { session: false }))
  @Redirect('/')
  async getGithubCallback(@Req() request: Request, @Res() response: Response) {
    const { id: authProviderID, username: githubUsername } = request.user as any;
    const userID = (request.query?.state as string).trim();

    const userIsExist = userID ? await UserService.existGithubUser(userID as string) : false;
    if (userIsExist) {
      UserService.updateGithubUserInfo(userID as string, { githubUsername });
    } else {
      UserService.findOrCreateUserForProvider({
        authProvider: 'github',
        authProviderID,
        githubUsername,
      });
      const accessToken = JWT.createAccessToken(request.user!);

      const cookieOptions = {
        maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
        domain: process.env.MAIN_DOMAIN,
      };
      response.cookie('jwt', accessToken, cookieOptions);
    }

    return `${process.env.CLIENT_URL}`;
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
