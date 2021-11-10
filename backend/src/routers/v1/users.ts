import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, Delete, UseBefore, Redirect } from 'routing-controllers';
import * as passport from 'passport';

import { UserService } from 'src/services';

@Controller('/users')
export default class UsersRouter {
  @Get('/')
  async getUsersValidUsername(@Req() request: Request, @Res() response: Response) {
    const { username } = request.query;
    if (!username) {
      throw new Error('잘못된 형식의 Query 입니다.');
    }
    const isExistUsername = await UserService.existsUserForUsername({
      username: username as string,
    });
    return response.json({ isExistUsername });
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

  @Get('/:userID')
  async getUser(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error('Permission Denied.');
    }
    const userProfile = await UserService.findOneUserProfileForID(userID);
    return response.json(userProfile);
  }

  @Get('/:userID/posts')
  async getUserPosts(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error('Permission Denied.');
    }
    const userPosts = await UserService.findOneUserPostsForID(userID);
    return response.json(userPosts);
  }

  @Get('/:userID/settings')
  async getUserSetting(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error('Permission Denied.');
    }
    const userSettings = await UserService.findOneUserSettingForID(userID);
    return response.json(userSettings);
  }

  @Get('/:userID/suggestions')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getUserSuggestions(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error('Permission Denied.');
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
      throw new Error('Permission Denied.');
    }
    await UserService.updateOneUserConfig({ userID: request.user!.userID }, request.body);
    return response.send();
  }

  @Put('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID === request.user!.userID) {
      throw new Error('같은 사용자는 Follow 할 수 없습니다.');
    }
    await UserService.addToSetFollows(request.user!, userID);
    return response.json({ code: 'Success' });
  }

  @Delete('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID === request.user!.userID) {
      throw new Error('같은 사용자는 Follow 할 수 없습니다.');
    }
    await UserService.pullFollows(request.user!, userID);
    return response.json({ code: 'Success' });
  }
}
