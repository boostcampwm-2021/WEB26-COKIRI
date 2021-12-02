import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get, UseBefore } from 'routing-controllers';
import * as passport from 'passport';

import { ERROR, RESPONSECODE } from 'src/utils';
import { PostLikeService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
  @Get('/:postID/likes')
  async getPostLikeList(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const postLikes = await PostLikeService.findPostLikes(postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: postLikes });
  }

  @Post('/:postID/likes')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postPostLike(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const { userID } = request.body;
    if (!userID) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const _id = await PostLikeService.createPostLike(userID, postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: { _id } });
  }

  @Delete('/:postID/likes/:likeID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deletePostLike(@Req() request: Request, @Res() response: Response) {
    const { postID, likeID } = request.params;
    const { userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const { deletedCount } = await PostLikeService.removePostLike(userID, postID, likeID);
    if (!deletedCount) {
      throw new Error(ERROR.NOT_EXIST_POST_LIKE);
    }
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
