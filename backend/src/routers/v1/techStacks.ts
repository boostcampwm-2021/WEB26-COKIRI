import { Request, Response } from 'express';
import { Controller, Req, Res, Get } from 'routing-controllers';

import { TechStackService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/techstacks')
export default class TechStacksRouter {
  @Get('/search')
  async getSearch(@Req() request: Request, @Res() response: Response) {
    let query = request.query.query as string;
    if (query === undefined) {
      throw new Error(ERROR.NOT_EXIST_RESULT);
    }
    query = query?.trim().toLowerCase();
    if (query.length === 0) {
      return response.json({ code: RESPONSECODE.SUCCESS, data: [] });
    }
    const result = await TechStackService.findSearch(query as string);
    return response.json({ code: RESPONSECODE.SUCCESS, data: result });
  }
}
