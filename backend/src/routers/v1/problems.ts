import { Request, Response } from 'express';
import { Controller, Req, Res, Get, Put } from 'routing-controllers';

import ProblemService from 'src/services/ProblemService';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/problems')
export default class problemRouter {
  @Get('/')
  async getProblemSuggestions(@Req() request: Request, @Res() response: Response) {
    const { query } = request.query;
    if (typeof query !== 'string') {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }
    const problemSuggestions = await ProblemService.findSearchSuggestions(query);
    return response.json({ code: RESPONSECODE.SUCCESS, data: problemSuggestions });
  }

  @Get('/:problemID')
  async getProblem(@Req() request: Request, @Res() response: Response) {
    const { problemID } = request.params;
    const problemShowInformation = await ProblemService.findProblemContent(problemID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: problemShowInformation });
  }

  @Put('/statistics')
  async getStatistics(@Req() request: Request, @Res() response: Response) {
    const { username } = request.query;
    const statistics = await ProblemService.getSolvedAcStatistics(username as string);
    return response.json({ code: RESPONSECODE.SUCCESS, data: statistics });
  }
}
