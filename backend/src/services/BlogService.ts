import { Blog } from 'src/models';
import { TistoryService } from 'src/services/index';

class BlogService {
  async createBlog(blog: { url: string; identity: string; type: 'tistory'; userID: string }) {
    return Blog.updateOne(
      { userID: blog.userID, identity: blog.identity, type: blog.type },
      { $setOnInsert: blog },
      { upsert: true, runValidators: true, new: true },
    );
  }

  async findUserBlogs(userID: string) {
    const blogs = await Blog.find({ userID });
    if (blogs.length === 0) {
      // @TODO 나중에 blog 선택 api 로 변경해야됨
      await TistoryService.updateOneUserBlogURL(userID);
    }
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
    });
  }
}

export default new BlogService();
