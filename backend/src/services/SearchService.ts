import { User } from 'src/models';

class SearchService {
  async findSearch(query: string) {
    const result = User.find(
      { username: { $regex: query }, isRegistered: true },
      'name username profileImage',
    );
    return result;
  }
}

export default new SearchService();
