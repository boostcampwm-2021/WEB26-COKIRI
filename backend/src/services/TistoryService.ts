import axios from 'axios';

import { OPENAPIURL, ERROR } from 'src/utils';
import { User } from 'src/models';
import { BlogService, UserService } from 'src/services/index';

class TistoryService {
  async getPostInPage(identity: string, accessToken: string, page = 1): Promise<any[]> {
    try {
      const result = await axios.get(OPENAPIURL.TISTORY_POSTS, {
        params: {
          access_token: accessToken,
          output: 'json',
          blogName: identity,
          page,
        },
      });
      const { posts } = result.data.tistory.item;
      if (posts) {
        const nextPagePosts = await this.getPostInPage(identity, accessToken, page + 1);
        return [...posts, ...nextPagePosts];
      }
      return [];
    } catch (error) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
  }

  async getAllPosts(userID: string, identity: string) {
    const accessToken = await UserService.findOneUserTistoryAccessToken(userID);
    if (!accessToken) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
    const posts = await this.getPostInPage(identity, accessToken);
    return posts.map((post) => ({
      postID: post.id,
      postTitle: post.title,
      type: 'tistory',
      identity,
    }));
  }

  async getPostContent(userID: string, identity: string, postID: string) {
    const accessToken = await UserService.findOneUserTistoryAccessToken(userID);
    if (!accessToken) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
    try {
      const postResponse = await axios.get(OPENAPIURL.TISTORY_POST_READ, {
        params: {
          access_token: accessToken,
          blogName: identity,
          postId: postID,
          output: 'json',
        },
      });
      const { title, content, postUrl } = postResponse.data.tistory.item;
      return {
        title,
        content,
        link: postUrl,
        blog: 'tistory',
        blogPostID: postID,
        blogIdentity: identity,
      };
    } catch (error) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
  }

  async updateOneUserAccessToken(code: string, userID: string) {
    const result = await axios.get(OPENAPIURL.TISTORY_ACCESS_TOKEN, {
      params: {
        client_id: process.env.TISTORY_CLIENT_ID,
        client_secret: process.env.TISTORY_SECRET_ID,
        redirect_uri: process.env.TISTORY_CALLBACK_URL,
        code,
        grant_type: 'authorization_code',
      },
    });
    return User.updateOne({ _id: userID }, { tistoryAccessToken: result.data.access_token });
  }

  async updateOneUserBlogURL(userID: string) {
    const result = await User.findOne({ _id: userID }, 'tistoryAccessToken -_id');
    try {
      const tistoryInfoResult = await axios.get(OPENAPIURL.TISTORY_INFO, {
        params: { access_token: result!.tistoryAccessToken, output: 'json' },
      });
      const { blogs } = tistoryInfoResult.data.tistory.item;
      let tistoryBlog: any;
      blogs.every((blog: any) => {
        if (blog.role === '소유자' && blog.isEmpty === 'false') {
          tistoryBlog = blog;
          return false;
        }
        return true;
      });
      return BlogService.createBlog({
        url: tistoryBlog.url,
        identity: tistoryBlog.name,
        userID,
        type: 'tistory',
      });
    } catch (error) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
  }
}

export default new TistoryService();
