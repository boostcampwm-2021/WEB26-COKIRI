import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

import ProblemService from 'src/services/ProblemService';
import { ERROR } from 'src/utils';

@Controller('/problems')
export default class problemRouter {
  @Get('/')
  async getProblemSuggestions(@Req() request: Request, @Res() response: Response) {
    const { query } = request.query;
    if (typeof query !== 'string') {
      throw new Error(ERROR.WRONG_QUERY_TYPE);
    }
    const problemSuggestions = await ProblemService.getSearchSuggestions(query);
    return response.json(problemSuggestions);
  }

  @Get('/:problemID')
  async getProblem(@Req() request: Request, @Res() response: Response) {
    const { problemID } = request.params;
    const problemShowInformation = await ProblemService.getProblemShow(problemID);
    return response.json(problemShowInformation);
  }
}
