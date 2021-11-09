import axios, { AxiosInstance } from 'axios';

import { UserType } from 'src/types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {},
});

class Fetcher {
  static async getUsersMe(token: string): Promise<UserType> {
    try {
      const result = await axiosInstance.get('/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data.user;
    } catch (error) {
      return {};
    }
  }
}

export default Fetcher;
