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
  static async setUsername(username: string, userID?: string): Promise<any> {
    await axios.put(`/v1/users/${userID}`, {
      username,
    });
  }
}

export default Fetcher;
