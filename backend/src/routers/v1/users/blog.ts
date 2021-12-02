import { Request, Response } from 'express';
import { Controller, Req, Res, Get, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

import { BlogService, TistoryService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';

@Controller('/users')
export default class UsersRouter {
  @Get('/:userID/blogs')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getUserTistory(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const posts = await BlogService.findUserBlogs(userID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: posts });
  }

  @Get('/:userID/tistory/:identity/posts/:postID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTistoryPostContent(@Req() request: Request, @Res() response: Response) {
    const { userID, identity, postID } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const postContent = await TistoryService.findPostContent(userID, identity, postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: postContent });
  }
}
