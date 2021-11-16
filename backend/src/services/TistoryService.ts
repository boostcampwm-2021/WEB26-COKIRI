import axios from 'axios';

import { OPENAPIURL } from 'src/utils';
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

  async updateOneUserURL(userID: string) {
    const result = await User.findOne({ _id: userID }, 'tistoryAccessToken -_id');
    if (!result!.tistoryAccessToken) throw new Error('토큰 없습니다~~');
    const tistoryInfoResult = await axios.get(OPENAPIURL.TISTORY_INFO, {
      params: {
        access_token: result!.tistoryAccessToken,
        output: 'json',
      },
    });
    return User.updateOne(
      { _id: userID },
      { tistoryURL: tistoryInfoResult.data.tistory.item.blogs[0].url },
    );
  }
}

export default new TistoryService();
