import axios from 'axios';

import { Enums } from 'src/utils';
import { User } from 'src/models';

class TistoryService {
  async updateOneUserAccessToken(code: string, userID: string) {
    const result = await axios.get(Enums.openAPIUrl.TISTORY_ACCESS_TOKEN, {
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

  async updateOneUserTistory(problemID: string) {}
}

export default new TistoryService();
