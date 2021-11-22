import axios from 'axios';

import { OPENAPIURL, ERROR } from 'src/utils';
import { User } from 'src/models';
import { BlogService, UserService } from 'src/services/index';

class TistoryService {
  async findPostInPage(identity: string, accessToken: string, page = 1): Promise<any[]> {
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
        const nextPagePosts = await this.findPostInPage(identity, accessToken, page + 1);
        return [...posts, ...nextPagePosts];
      }
      return [];
    } catch (error) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
  }

  async findAllPosts(userID: string, identity: string) {
    const accessToken = await UserService.findOneUserTistoryAccessToken(userID);
    if (!accessToken) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
    const posts = await this.findPostInPage(identity, accessToken);
    return posts.map((post) => ({
      postID: post.id,
      postTitle: post.title,
      type: 'tistory',
      identity,
    }));
  }

  async findPostContent(userID: string, identity: string, postID: string) {
    const accessToken = await UserService.findOneUserTistoryAccessToken(userID);
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
        external: {
          type: 'tistory' as const,
          content: content as string,
          link: postUrl as string,
          identity,
          target: postID,
        },
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
    return User.updateOne(
      { _id: userID },
      { 'blogAuthentication.tistory': result.data.access_token },
    );
  }

  async updateOneUserBlogURL(userID: string) {
    const result = await User.findOne({ _id: userID }, 'blogAuthentication.tistory -_id').lean();
    try {
      const tistoryInfoResult = await axios.get(OPENAPIURL.TISTORY_INFO, {
        params: { access_token: result?.blogAuthentication!.tistory, output: 'json' },
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
