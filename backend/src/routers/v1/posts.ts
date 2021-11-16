import { Request, Response } from 'express';
import { Controller, Req, Res, Post, Delete, Get, UseBefore, Put } from 'routing-controllers';
import * as passport from 'passport';

import { PostService, CommentService, PostLikeService, CommentLikeService } from 'src/services';
import { ERROR, RESPONSECODE } from 'src/utils';
import ImageService from 'src/services/ImageService';

@Controller('/posts')
export default class PostsRouter {
  @Get('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async getTimeline(@Req() request: Request, @Res() response: Response) {
    const { user_id: userID, offset } = request.query;
    if (userID !== request.user?.userID) {
      throw new Error(ERROR.PERMISSION_DENIED);
    }
    const posts = await PostService.findTimeline(userID as string, +offset!);
    return response.json(posts);
  }

  @Get('/random')
  async getRandomPosts(@Req() request: Request, @Res() response: Response) {
    return response.json(await PostService.findRandomPost());
  }

  @Get('/:postID/likes')
  async getPostLikeList(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const postLikes = await PostLikeService.findPostLikes(postID);
    return response.json(postLikes);
  }

  @Get('/:postID')
  async getPost(@Req() request: Request, @Res() response: Response) {
    const { postID } = request.params;
    const results = await Promise.all([
      PostService.findPost(postID),
      CommentService.findComments(postID),
      PostLikeService.findPostLikes(postID),
      ImageService.findPostImage(postID),
    ]);
    return response.json({
      ...results[0],
      comments: results[1],
      likes: results[2],
      images: results[3],
    });
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
    const results = await Promise.all([
      PostService.findPost(postID),
      CommentService.findComments(postID),
      PostLikeService.findPostLikes(postID),
      ImageService.findPostImage(postID),
    ]);
    return response.json({
      ...results[0],
      comments: results[1],
      likes: results[2],
      images: results[3],
    });
  }

  @Post('/')
  @UseBefore(passport.authenticate('jwt-registered', { session: false }))
  async postPost(@Req() request: Request, @Res() response: Response) {
    const data = request.body;
    const post = await PostService.createPost(data);
    return response.json({ code: RESPONSECODE.SUCCESS, result: post });
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
    return response.json({ code: RESPONSECODE.SUCCESS, result: comment });
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
    return response.json({ code: RESPONSECODE.SUCCESS, result: { _id } });
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
    await CommentService.existsComment(postID, commentID);
    const _id = await CommentLikeService.createCommentLike(userID, commentID);
    return response.json({ code: RESPONSECODE.SUCCESS, result: { _id } });
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
    await Promise.all([
      PostService.removePost(postID),
      ImageService.removePostImage(postID),
      CommentService.removeComments(postID),
    ]);
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
    await CommentService.existsComment(postID, commentID);
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
    await CommentService.existsComment(postID, commentID);
    await CommentLikeService.removeCommentLike(commentID, likeID);
    return response.json({ code: RESPONSECODE.SUCCESS });
  }
}
