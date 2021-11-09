import axios from 'axios';

import { UserType } from 'src/types';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

class Fetcher {
  static init(token: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.baseURL = baseURL;
  }

  // for server side
  static async getUsersMe(token: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/v1/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data.user;
    } catch (error) {
      return {};
    }
  }

  // for client side
  static async putUsersUsername(username: string, user: UserType): Promise<any> {
    await axios.put(
      // eslint-disable-next-line no-underscore-dangle
      `${baseURL}/v1/users/${user._id}`,
      {
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
  }
}

export default Fetcher;
