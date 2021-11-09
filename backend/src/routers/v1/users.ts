import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

import { UserService } from 'src/services';
import { UserType } from 'src/types';

@Controller('/users')
export default class UsersRouter {
  @Get('/')
  async getUsersValidUsername(@Req() request: Request, @Res() response: Response) {
    const { username } = request.query;
    if (!username) throw new Error('잘못된 형식의 Query 입니다.');
    const isExistUsername = await UserService.existsUserForUsername({
      username: username as string,
    });
    return response.json({ isExistUsername });
  }

  @Get('/me')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async getUsersMe(@Req() request: Request, @Res() response: Response) {
    console.log(request.user);
    const user = await UserService.findOneUserForID({ userID: request.user!.userID });
    return response.json({ user });
  }

  @Get('/:userID')
  async getUser(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const userProfile = await UserService.findOneUserProfileForID(userID);
    return response.json({ userProfile });
  }

  @Put('/:userID')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async putUser(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) throw new Error('잘못된 형식의 Path Params 입니다.');
    await UserService.updateOneUserConfig({ userID: request.user!.userID }, request.body);
    return response.send('Test!');
  }
}
