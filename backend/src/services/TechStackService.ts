import { TechStack } from 'src/models';

class TechStackService {
  async findSearch(query: string) {
    const result = TechStack.find({
      $or: [{ searchString: { $regex: query } }, { searchCon: { $regex: query } }],
      isRegistered: true,
    });
    return result;
  }
}

export default new TechStackService();
