import axios from 'axios';

export default class GitService {
  static async findRepoList(username: string) {
    const apiData = await axios.get(`https://api.github.com/users/${username}/repos`);
    const result = apiData.data.map((v: any) => {
      return {
        name: v.name,
        description: v.description,
        url: v['html_url'],
      };
    });
    console.log(result);
    return result;
  }
}
