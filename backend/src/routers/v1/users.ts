import { Request, Response } from 'express';
import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Put,
  Delete,
  UseBefore,
  Redirect,
} from 'routing-controllers';
import * as passport from 'passport';

import { PostService, UserService, GitService, BlogService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';
import FollowService from 'src/services/FollowService';

@Controller('/users')
export default class UsersRouter {
  @Get('/')
  async getUsersValidUsername(@Req() request: Request, @Res() response: Response) {
    const { username, query } = request.query;
    if (!username && !query) {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }
    let responseJSON;
    if (query) {
      if (typeof query !== 'string') {
        throw new Error(ERROR.WRONG_QUERY_TYPE);
      }
      responseJSON = await UserService.existsUserForUsername(query as string);
    }
    if (username) {
      if (typeof username !== 'string') {
        throw new Error(ERROR.WRONG_QUERY_TYPE);
      }
      const userProfile = await UserService.findOneUserProfileForUsername(username as string);
      const counts = await Promise.all([
        PostService.findPostCount(userProfile._id!),
        FollowService.countFollows(userProfile._id!),
        FollowService.countFollowers(userProfile._id!),
      ]);
      responseJSON = {
        ...userProfile,
        postCount: counts[0],
        followCount: counts[1],
        followerCount: counts[2],
      };
    }
    return response.json(responseJSON);
  }

  @Get('/me')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async getUsersMe(@Req() request: Request, @Res() response: Response) {
    const results = await Promise.all([
      UserService.findOneUserForID(request.user!.userID),
      FollowService.findFollowsID(request.user!.userID),
      FollowService.findFollowersID(request.user!.userID),
    ]);
    return response.json({ ...results[0], follows: results[1], followers: results[2] });
  }

  @Get('/logout')
  @Redirect(`${process.env.CLIENT_URL}`)
  getLogout(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('jwt');
  }

  @Get('/:userID/posts')
  async getUserPosts(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const userPosts = await PostService.findUserTimeline(userID);
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
    if (typeof userID !== 'string') {
      throw new Error(Enums.error.WRONG_QUERY_TYPE);
    }
    const randomUserSuggestions = await UserService.findRandomUserSuggestions(userID as string);
    // @TODO 사용자 정보 기반 추천
    return response.json(randomUserSuggestions);
  }

  @Get('/:userID/follows')
  async getUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const follows = await FollowService.findFollows(userID);
    return response.json(follows);
  }

  @Get('/:userID/tistory/blogs')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getUserTistory(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(Enums.error.PERMISSION_DENIED);
    }
    await TistoryService.updateOneUserBlogURL(userID);
    return response.json({});
  }

  @Get('/:userID/followers')
  async getUserFollowers(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const followList = await FollowService.findFollowers(userID);
    return response.json(followList);
  }

  @Get('/:userID/repositories')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getRepoList(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    /**
     * @todo: userID를 받아서 db 상에 github username을 받아와 넣어주도록 추후에 변경해야함
     */
    const result = await GitService.findRepoList(userID);
    return response.json(result);
  }

  @Get('/:userID/repositories/contribution')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getRepoContribution(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const result = await GitService.findContribution(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, result });
  }

  @Get('/:userID/repositories/:repoName')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getRepo(@Req() request: Request, @Res() response: Response) {
    const { userID, repoName } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const githubUsername = await UserService.findUserGithubUsername(userID);
    if (githubUsername === undefined) {
      throw new Error(ERROR.NO_GITHUBUSERNAME);
    }
    const result = await GitService.findRepo(githubUsername, repoName);
    return response.json(result);
  }

  @Post('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const { userID: bodyUserID } = request.body;
    if (bodyUserID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    if (userID === request.user!.userID) {
      throw new Error(ERROR.WRONG_PARAMS_TYPE);
    }
    await FollowService.createFollow(userID, request.user!.userID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }

  @Put('/:userID/settings')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async putUser(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(Enums.error.PERMISSION_DENIED);
    }
    await UserService.updateOneUserConfig(request.user!.userID, request.body);
    return response.json({ code: Enums.responseCode.SUCCESS });
  }

  @Delete('/:userID/follows')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteUserFollows(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const { userID: bodyUserID } = request.body;
    if (bodyUserID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    if (userID === request.user!.userID) {
      throw new Error(ERROR.WRONG_PARAMS_TYPE);
    }
    await FollowService.removeFollow(request.user!.userID, userID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
