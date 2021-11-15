/* eslint camelcase: 0 */
import axios from 'axios';
import * as Base64 from 'js-base64';

import { calculateLanguage } from 'src/utils/Calculate';
import { GITREPOLISTAPI, GITREPOINFOAPI, GITREPOREADMEAPI } from 'src/utils/Enums';

class GitService {
  async findRepoList(username: string) {
    const apiData = await axios.get(GITREPOLISTAPI(username));
    const result = apiData.data.map((v: any) => ({ name: v.name, url: v.html_url }));
    return result;
  }

  async findRepo(githubUsername: string, repoName: string) {
    const apiData = (await axios.get(GITREPOINFOAPI(githubUsername, repoName))).data;
    const readmeData = (await axios.get(GITREPOREADMEAPI(githubUsername, repoName))).data;
    const { name, html_url, stargazers_count, forks_count, languages_url } = apiData;
    const languageData = (await axios.get(languages_url)).data;
    const languageInfo = calculateLanguage(languageData);
    const { content } = readmeData;
    const decodeContent = Base64.decode(content);
    const result = {
      repoName: name,
      repoUrl: html_url,
      startCount: stargazers_count,
      forkCount: forks_count,
      content: decodeContent,
      languageInfo,
    };
    return result;
  }
}

export default new GitService();
