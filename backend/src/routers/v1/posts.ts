import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get, UseBefore, Put } from 'routing-controllers';
import * as passport from 'passport';

import { ERROR, RESPONSECODE, PERPAGE, RouterFunc } from 'src/utils';
import { PostService, CommentService, PostLikeService, CommentLikeService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
  @Get('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTimeline(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, cursor: cursorTemp } = request.query;
    let cursor: number;
    if (!cursorTemp) {
      cursor = 0;
    } else {
      cursor = +cursorTemp;
    }

    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }

    const { posts, postCount } = await PostService.findTimeline(userID as string, cursor);
    const data = RouterFunc.makeCursorData(posts, postCount, cursor);
    return response.json(data);
  }

  @Get('/random')
  async getRandomPosts(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID } = request.query;
    let { cursor } = request.query;
    if (!cursor) {
      cursor = '0';
    }
    const { posts, postCount } = await PostService.findRandomPost(userID, +cursor);
    const data: { code: string; nextCursor: any; data: any } = {
      code: RESPONSECODE.SUCCESS,
      nextCursor: +cursor! + PERPAGE,
      data: posts,
    };

    if (+cursor! + 1 >= postCount) {
      delete data.nextCursor;
    } else if (data.nextCursor > postCount) {
      data.nextCursor = postCount - 1;
    }

    return response.json({ code: RESPONSECODE.SUCCESS, data });
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
    const post = await PostService.findOnePost(postID);
    return response.json({ code: RESPONSECODE.SUCCESS, data: post });
  }

  @Put('/:postID/blog')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async putTistoryPost(@Req() request: Request, @Res() response: Response) {
    const { userID, type } = request.body;
    const { postID } = request.params;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    if (!type) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    if (type === 'tistory') await PostService.updateTistoryPost(userID, postID);
    const post = await PostService.findOnePost(postID);
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
    const { deletedCount } = await PostLikeService.removePostLike(userID, postID, likeID);
    if (!deletedCount) {
      throw new Error(ERROR.NOT_EXIST_POST_LIKE);
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
      throw new Error(ERROR.NOT_EXIST_COMMENT_LIKE);
    }
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
