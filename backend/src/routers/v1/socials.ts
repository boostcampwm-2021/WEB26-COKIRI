import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';
import { Types } from 'mongoose';

import { OPENAPIURL, Authorization, Query, ERROR, RESPONSECODE } from 'src/utils';
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
      state: Authorization.createEncodeOauthState({ redirectURI }),
    })(request, response);
    return response;
  }

  @Get('/google/callback')
  @UseBefore(passport.authenticate('google', { session: false }))
  @Redirect('/')
  getGoogleCallback(@Req() request: Request, @Res() response: Response) {
    const state = Authorization.getDecodeOauthState(request.query.state as string);
    if (!Authorization.compareOauthState(state)) {
      return `${process.env.CLIENT_URL}`;
    }
    const accessToken = Authorization.createAccessJWT(request.user!);
    response.cookie('jwt', accessToken, Authorization.cookieOptions);
    return `${process.env.CLIENT_URL}${state.redirectURI}`;
  }

  @Get('/kakao')
  getKakao(@Req() request: Request, @Res() response: Response) {
    const { redirect_uri: redirectURIQuery } = request.query;
    const redirectURI: string = (redirectURIQuery as string) || '/';
    passport.authenticate('kakao', {
      session: false,
      state: Authorization.createEncodeOauthState({ redirectURI }),
    })(request, response);
    return response;
  }

  @Get('/kakao/callback')
  @UseBefore(passport.authenticate('kakao', { session: false }))
  @Redirect('/')
  getKakaoCallback(@Req() request: Request, @Res() response: Response) {
    const state = Authorization.getDecodeOauthState(request.query.state as string);
    if (!Authorization.compareOauthState(state)) {
      return `${process.env.CLIENT_URL}`;
    }
    const accessToken = Authorization.createAccessJWT(request.user!);
    response.cookie('jwt', accessToken, Authorization.cookieOptions);
    return `${process.env.CLIENT_URL}${state.redirectURI}`;
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
        state: Authorization.createEncodeOauthState({ redirectURI, userID: request.user!.userID }),
      })}`,
    });
  }

  @Get('/tistory/callback')
  @Redirect('/')
  async getTistoryCallback(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    const state = Authorization.getDecodeOauthState(request.query.state as string);
    if (!Authorization.compareOauthState(state)) {
      return `${process.env.CLIENT_URL}`;
    }
    try {
      await TistoryService.updateOneUserAccessToken(code as string, state.userID);
      await TistoryService.updateOneUserBlogURL(state.userID);
    } catch (error) {
      return `${process.env.CLIENT_URL}`;
    }

    return `${process.env.CLIENT_URL}${state.redirectURI}`;
  }

  @Get('/github')
  getGithub(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, redirect_uri: redirectURIQuery } = request.query;
    const redirectURI: string = (redirectURIQuery as string) || '/';
    if (userID && !Types.ObjectId.isValid(userID as string)) {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }
    passport.authenticate('github', {
      session: false,
      state: Authorization.createEncodeOauthState({ userID, redirectURI }),
    })(request, response);
    return response;
  }

  @Get('/github/callback')
  @UseBefore(passport.authenticate('github', { session: false }))
  @Redirect('/')
  async getGithubCallback(@Req() request: Request, @Res() response: Response) {
    const state = Authorization.getDecodeOauthState(request.query.state as string);
    const { id: authProviderID, username: githubUsername } = request.user as any;
    const { userID, redirectURI } = state;

    if (!Authorization.compareOauthState(state)) {
      return `${process.env.CLIENT_URL}`;
    }

    if (userID && !Types.ObjectId.isValid(userID)) {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }

    const userIsExist = userID ? await UserService.existsUserForUserID(userID) : false;
    if (userIsExist) {
      UserService.updateGithubUserInfo(userID, { githubUsername });
    } else {
      const user = await UserService.findOrCreateUserForProvider({
        authProvider: 'github',
        authProviderID,
        githubUsername,
      });
      const accessToken = Authorization.createAccessJWT(user);

      response.cookie('jwt', accessToken, Authorization.cookieOptions);
    }
    return `${process.env.CLIENT_URL}${redirectURI}`;
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
