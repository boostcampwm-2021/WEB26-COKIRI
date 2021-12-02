import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Get, UseBefore, Delete } from 'routing-controllers';
import * as passport from 'passport';

import { ERROR, RESPONSECODE } from 'src/utils';
import { CommentService, CommentLikeService } from 'src/services';

@Controller('/posts/likes')
export default class PostsRouter {
  @Post('/:postID/comments')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postComment(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const { userID, content } = request.body;
    if (!userID || !content) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const comment = await CommentService.createComment(userID, content, postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: comment });
  }

  @Post('/:postID/comments/:commentID/likes')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postCommentLike(@Req() request: Request, @Res() response: Response) {
    const { postID, commentID } = request.params;
    const { userID } = request.body;
    if (!userID) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await CommentService.existsComment(postID, commentID, undefined);
    const _id = await CommentLikeService.createCommentLike(userID, commentID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: { _id } });
  }

  @Delete('/:postID/comments/:commentID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteComment(@Req() request: Request, @Res() response: Response) {
    const { postID, commentID } = request.params;
    const { userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await CommentService.existsComment(postID, commentID, userID);
    await CommentService.removeComment(postID, commentID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }

  @Delete('/:postID/comments/:commentID/likes/:likeID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deleteCommentLike(@Req() request: Request, @Res() response: Response) {
    const { postID, commentID, likeID } = request.params;
    const { userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await CommentService.existsComment(postID, commentID, undefined);
    const { deletedCount } = await CommentLikeService.removeCommentLike(commentID, likeID);
    if (!deletedCount) {
      throw new Error(ERROR.NOT_EXIST_COMMENT_LIKE);
    }
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
