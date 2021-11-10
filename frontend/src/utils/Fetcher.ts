import axios from 'axios';

import { UserType } from 'src/types';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

class Fetcher {
  // for server side
  static async getUsersMe(token: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data.user;
    } catch (error) {
      return {};
    }
  }

  // for client side
  static async putUsersUsername(username: string, user: UserType): Promise<void> {
    await axios.put(
      `${baseURL}/v1/users/${user._id}`,
      { username },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
  }

  static async postPost(user: UserType, content: string): Promise<void> {
    await axios.post(
      `${baseURL}/v1/posts`,
      {
        userID: user._id,
        content,
        image: 'https://github.com/dmin0211.png',
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
  }

  static async getSignout(): Promise<void> {
    await axios.get(`${baseURL}/v1/users/logout`);
  }
}

export default Fetcher;
