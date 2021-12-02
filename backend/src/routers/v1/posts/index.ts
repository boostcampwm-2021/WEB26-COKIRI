import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get, UseBefore, Put } from 'routing-controllers';
import * as passport from 'passport';

import { ERROR, RESPONSECODE, Cursor } from 'src/utils';
import { PostService } from 'src/services';

@Controller('/posts')
export default class PostsRouter {
  @Get('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTimeline(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, cursor: cursorTemp } = request.query;
    const cursor = Cursor.setCursor(cursorTemp as any);

    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }

    const { posts, postCount } = await PostService.findTimeline(userID as string, cursor);
    const data = Cursor.makeCursorData(posts, postCount, cursor);
    return response.json(data);
  }

  @Get('/random')
  async getRandomPosts(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, cursor: cursorTemp } = request.query;
    const cursor = Cursor.setCursor(cursorTemp as any);

    const { posts, postCount } = await PostService.findRandomPost(userID, cursor);
    const data = Cursor.makeCursorData(posts, postCount, cursor);
    return response.json(data);
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
}
