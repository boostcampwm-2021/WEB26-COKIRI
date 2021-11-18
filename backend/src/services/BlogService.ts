import { Blog } from 'src/models';
import { TistoryService } from 'src/services/index';
import { ERROR } from 'src/utils';

class BlogService {
  async existsVelogBlog(userID: string, username: string) {
    return Blog.exists({ userID, identity: username });
  }

  async createBlog(blog: {
    url: string;
    identity: string;
    type: 'tistory' | 'velog';
    userID: string;
  }) {
    return Blog.updateOne(
      { userID: blog.userID, identity: blog.identity, type: blog.type },
      { $setOnInsert: blog },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findUserBlogs(userID: string) {
    const blogs = await Blog.find({ userID });
    if (blogs.length === 0) {
      throw new Error(ERROR.NO_BLOGS);
    }
    return Promise.all(
      blogs.map(async (blog) => {
        const { type, identity } = blog;
        let posts: any[] = [];
        switch (type) {
          case 'tistory':
            posts = await TistoryService.getAllPosts(userID, identity!);
            break;
          default:
        }
        return posts;
      }),
    );
  }
}

export default new BlogService();
