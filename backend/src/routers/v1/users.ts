import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, Delete, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { UserService } from 'src/services';
import { Enums } from 'src/utils';

@Controller('/users')
export default class UsersRouter {
  @Get('/')
  async getUsersValidUsername(@Req() request: Request, @Res() response: Response) {
    const { username, query } = request.query;
    if (!username && !query) {
      throw new Error(Enums.error.WRONG_QUERY_TYPE);
    }
    let responseJSON;
    if (query) {
      if (typeof query !== 'string') throw new Error(Enums.error.WRONG_QUERY_TYPE);
      responseJSON = await UserService.existsUserForUsername(query as string);
    }
    if (username) {
      if (typeof username !== 'string') throw new Error(Enums.error.WRONG_QUERY_TYPE);
      responseJSON = await UserService.findOneUserProfileForUsername(username as string);
    }
    return response.json(responseJSON);
  }

  @Get('/me')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async getUsersMe(@Req() request: Request, @Res() response: Response) {
    const user = await UserService.findOneUserForID({ userID: request.user!.userID });
    return response.json(user);
  }

  @Get('/logout')
  @Redirect('/')
  getLogout(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('jwt');
  }

  @Get('/:userID/posts')
  async getUserPosts(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const userPosts = await UserService.findOneUserPostsForID(userID);
    return response.json(userPosts);
  }

  @Get('/:userID/settings')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getUserSetting(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(Enums.error.PERMISSION_DENIED);
    }
    const userSettings = await UserService.findOneUserSettingForID(userID);
    return response.json(userSettings);
  }

  @Get('/:userID/suggestions')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getUserSuggestions(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(Enums.error.PERMISSION_DENIED);
    }
    const randomUserSuggestions = await UserService.findRandomUserSuggestions();
    // @TODO 사용자 정보 기반 추천
    return response.json(randomUserSuggestions);
  }

  @Get('/:userID/follows')
  async getUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const followList = await UserService.findOneFollows(userID);
    return response.json(followList);
  }

  @Get('/:userID/followers')
  async getUserFollowers(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const followList = await UserService.findOneFollowers(userID);
    return response.json(followList);
  }

  @Put('/:userID/settings')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async putUser(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(Enums.error.PERMISSION_DENIED);
    }
    await UserService.updateOneUserConfig({ userID: request.user!.userID }, request.body);
    return response.send();
  }

  @Put('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID === request.user!.userID) {
      throw new Error(Enums.error.WRONG_PARAMS_TYPE);
    }
    await UserService.addToSetFollows(request.user!, userID);
    return response.json({ code: 'Success' });
  }

  @Delete('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID === request.user!.userID) {
      throw new Error(Enums.error.WRONG_PARAMS_TYPE);
    }
    await UserService.pullFollows(request.user!, userID);
    return response.json({ code: 'Success' });
  }
}
