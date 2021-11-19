import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get, UseBefore, Put } from 'routing-controllers';
import * as passport from 'passport';

import { ERROR, RESPONSECODE } from 'src/utils';
import { PostService, CommentService, PostLikeService, CommentLikeService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
  @Get('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTimeline(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, cursor } = request.query;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const posts = await PostService.findTimeline(userID as string, +cursor!);
    return response.json({ code: RESPONSECODE.SUCCESS, nextCursor: +cursor! + 1, data: posts });
  }

  @Get('/random')
  async getRandomPosts(@Req() request: Request, @Res() response: Response) {
    const posts = await PostService.findRandomPost();
    return response.json({ code: RESPONSECODE.SUCCESS, data: posts });
  }

  @Get('/:postID/likes')
  async getPostLikeList(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const postLikes = await PostLikeService.findPostLikes(postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: postLikes });
  }

  @Get('/:postID')
  async getPost(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const post = await PostService.findPost(postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: post });
  }

  @Put('/:postID/tistory')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putTistoryPost(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.body;
    const { postID } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await PostService.updateTistoryPost(userID, postID);
    const post = await PostService.findPost(postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: post });
  }

  @Post('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postPost(@Req() request: Request, @Res() response: Response) {
    const { userID } = request.body;
    const data = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const post = await PostService.createPost(data);
    return response.json({ code: RESPONSECODE.SUCCESS, data: post });
  }

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

  @Delete('/:postID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deletePost(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const { userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await PostService.existsPost(postID, userID);
    await PostService.removePost(postID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }

  @Delete('/:postID/likes/:likeID')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async deletePostLike(@Req() request: Request, @Res() response: Response) {
    const { postID, likeID } = request.params;
    const { userID } = request.body;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    await PostLikeService.removePostLike(userID, postID, likeID);
    const { deletedCount } = await PostLikeService.removePostLike(userID, postID, likeID);
    if (!deletedCount) {
      throw new Error(ERROR.NO_POST_LIKES);
    }
    return response.json({ code: RESPONSECODE.SUCCESS });
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
      throw new Error(ERROR.NO_COMMENT_LIKES);
    }
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
