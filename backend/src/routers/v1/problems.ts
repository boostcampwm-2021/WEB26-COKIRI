import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

import { ERROR, RESPONSECODE } from 'src/utils';
import { UserService, ProblemService } from 'src/services';

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
}
