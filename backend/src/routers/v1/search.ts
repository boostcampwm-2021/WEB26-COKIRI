import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

import { SearchService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/search')
export default class PostsRouter {
  @Get('/')
  async getSearch(@Req() request: Request, @Res() response: Response) {
    const query = (request.query.query as string).trim();
    if (query === undefined) {
      throw new Error(ERROR.NOT_EXIST_RESULT);
    }
    if (query.length === 0) {
      return response.json({ code: RESPONSECODE.SUCCESS, data: [] });
    }
    const result = await SearchService.findSearch(query as string);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }
}
