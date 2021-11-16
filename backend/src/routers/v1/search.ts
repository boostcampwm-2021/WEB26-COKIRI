import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

import { SearchService } from 'src/services';
import { ERROR } from 'src/utils';

@Controller('/search')
export default class PostsRouter {
  @Get('/')
  async getSearch(@Req() request: Request, @Res() response: Response) {
    const { query } = request.query;
    if (query === undefined) {
      throw new Error(ERROR.NO_QUERY);
    }
    const result = await SearchService.findSearch(query as string);
    return response.json(result);
  }
}
