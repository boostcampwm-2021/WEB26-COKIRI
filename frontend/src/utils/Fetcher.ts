import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {},
});

class Fetcher {
  static async getPosts() {
    await axiosInstance.get('/posts');
  }
}

export default Fetcher;
