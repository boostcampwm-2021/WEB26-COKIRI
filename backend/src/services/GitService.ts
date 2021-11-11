/* eslint camelcase: 0 */
import axios from 'axios';
import * as Base64 from 'js-base64';

import { GITREPOLISTAPI, GITREPOINFOAPI, GITREPOREADMEAPI } from 'src/utils/Enums';

class GitService {
  async findRepoList(username: string) {
    const apiData = await axios.get(GITREPOLISTAPI(username));
    const result = apiData.data.map((v: any) => ({ name: v.name, url: v.html_url }));
    return result;
  }

  async findRepo(githubUsername: string, repoName: string) {
    const apiData = await axios.get(GITREPOINFOAPI(githubUsername, repoName));
    const readmeData = await axios.get(GITREPOREADMEAPI(githubUsername, repoName));
    const { name, html_url, stargazers_count, forks_count } = apiData.data;
    const { content } = readmeData.data;
    const decodeContent = Base64.decode(content);
    const result = {
      repoName: name,
      repoUrl: html_url,
      startCount: stargazers_count,
      forkCount: forks_count,
      content: decodeContent,
    };
    return result;
  }
}

export default new GitService();
