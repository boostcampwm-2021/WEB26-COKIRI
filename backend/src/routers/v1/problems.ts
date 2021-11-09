import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';
import ProblemService from 'src/services/ProblemService';

@Controller('/problems')
export default class problemRouter {
  @Get('/')
  async getProblemSuggestions(@Req() request: Request, @Res() response: Response) {
    const { query } = request.query;
    if (typeof query !== 'string') throw new Error('Query 형태가 잘못되었습니다.');
    return response.json(await ProblemService.getSearchSuggestions(query));
  }

  @Get('/:problemID')
  async getProblem(@Req() request: Request, @Res() response: Response) {
    const { problemID } = request.params;
    return response.json(await ProblemService.getProblemShow(problemID));
  }
}
