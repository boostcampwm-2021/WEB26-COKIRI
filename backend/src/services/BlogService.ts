import { Blog } from 'src/models';
import { TistoryService } from 'src/services/index';

class BlogService {
  async existsBlog(userID: string) {
    return Blog.exists({ userID });
  }

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
      return [];
    }
    const blogPosts = await Promise.all(
      blogs.map(async (blog) => {
        const { type, identity } = blog;
        let posts: any[] = [];
        switch (type) {
          case 'tistory':
            posts = await TistoryService.findAllPosts(userID, identity!);
            break;
          default:
        }
        return posts;
      }),
    );
    return blogPosts.reduce((prev, curr) => prev.concat(curr), []);
  }
}

export default new BlogService();
