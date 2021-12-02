import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

import { UserService, GitService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/users')
export default class UsersRouter {
  @Get('/:userID/repositories')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getRepoList(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const githubUsername = await UserService.findGithubUsernameForUserID(userID);

    const result = await GitService.findRepoList(githubUsername as string);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
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
      throw new Error(ERROR.INVALID_GITHUB_USERNAME);
    }
    const result = await GitService.findRepo(githubUsername, repoName);
    return response.json({
      code: RESPONSECODE.SUCCESS,
      data: {
        title: result.repoName,
        type: 'repository',
        content: result.content,
        link: result.repoUrl,
        info: {
          starCount: result.starCount,
          forkCount: result.forkCount,
          language: result.languageInfo,
        },
        identity: githubUsername,
        target: repoName,
      },
    });
  }
}
