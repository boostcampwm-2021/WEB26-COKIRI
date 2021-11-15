import axios from 'axios';

import { OPENAPIURL, ERROR } from 'src/utils';
import { User } from 'src/models';

class TistoryService {
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
        params: {
          access_token: result!.tistoryAccessToken,
          output: 'json',
        },
      });
      const { blogs } = tistoryInfoResult.data.tistory.item;
      let tistoryBlog;
      blogs.every((blog: any) => {
        if (blog.role === '소유자' && blog.isEmpty === 'false') {
          tistoryBlog = blog;
        }
        return false;
      });
      await User.updateOne({ userID });
    } catch (error) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
  }
}

export default new TistoryService();
