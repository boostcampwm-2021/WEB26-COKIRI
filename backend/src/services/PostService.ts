import { Post } from 'src/models';

export default class PostService {
  static async createPost(data: any) {
    return Post.create(data);
  }
}
