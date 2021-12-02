import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Post, Put, Delete, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

import {
  UserService,
  GitService,
  DashboardRepoService,
  DashboardHistoryService,
  ProblemService,
} from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/users')
export default class UsersRouter {
  @Get('/dashboard')
  async getDashboard(@Req() request: Request, @Res() response: Response) {
    const { username } = request.query;
    if (!username) {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }
    const dashboard = await UserService.findOneUserDashboard({ username });
    const dashboardHistories = await DashboardHistoryService.findDashboardHistory(dashboard._id!);
    return response.json({
      code: RESPONSECODE.SUCCESS,
      data: { _id: dashboard._id, username, ...dashboard.dashboard, dashboardHistories },
    });
  }

  @Get('/:userID/dashboard/repositories')
  async getDashboardRepoList(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const result = await DashboardRepoService.readDashboardRepos(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }

  @Get('/:userID/dashboard/repositories/languages')
  async getDashboardReposLanguage(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const result = await DashboardRepoService.readDashboardReposLanguage(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }

  @Get('/:userID/dashboard/problems/statistics')
  async getDashboardProblemsStatistics(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const result = await ProblemService.findOneDashboardStatistics(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }

  @Post('/:userID/dashboard/repositories/:repoName')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postDashboardRepo(@Req() request: Request, @Res() response: Response) {
    const { userID, repoName } = request.params;
    const { userID: bodyUserID } = request.body;
    if (bodyUserID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.WRONG_PARAMS_TYPE);
    }
    const githubUsername = await UserService.findGithubUsernameForUserID(userID);
    const repoData = await GitService.findRepo(githubUsername as string, repoName);
    const result = await DashboardRepoService.createDashboardRepo(userID, repoData);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }

  @Post('/:userID/dashboard/histories')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postDashboardHistory(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const { content, date } = request.body;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.WRONG_PARAMS_TYPE);
    }
    if (!content || !date) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    const history = await DashboardHistoryService.createDashboardHistory(userID, content, date);
    return response.json({ code: RESPONSECODE.SUCCESS, data: history });
  }

  @Put('/:userID/dashboard')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async putDashboard(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const data = request.body;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }

    await UserService.updateOneUserDashboard(userID, data);

    const result = await UserService.findOneUserDashboard({ _id: userID });
    return response.json({
      code: RESPONSECODE.SUCCESS,
      data: { _id: result._id, ...result.dashboard },
    });
  }

  @Put('/:userID/dashboard/problems/:username/statistics')
  @UseBefore(passport.authenticate('jwt', { session: false }))
  async putStatistics(@Req() request: Request, @Res() response: Response) {
    const { username, userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const statistics = await ProblemService.findSolvedAcStatistics(username);
    UserService.updateOneProblemStatistics(userID, statistics);
    return response.json({ code: RESPONSECODE.SUCCESS, data: statistics });
  }

  @Put('/:userID/dashboard/repositories/languages')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putDashboardReposLanguage(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user!.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const result = await DashboardRepoService.updateDashboardReposLanguage(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }

  @Delete('/:userID/dashboard/histories')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteUserDashboardHistory(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    const { historyID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    if (!historyID) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    await DashboardHistoryService.deleteDashboardHistory(userID, historyID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }

  @Delete('/:userID/dashboard/repositories/:repoName')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteDashboardRepo(@Req() request: Request, @Res() response: Response) {
    const { userID, repoName } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await DashboardRepoService.deleteDashboardRepo(userID, repoName);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
