/* eslint camelcase: 0 */
import axios from 'axios';
import * as Base64 from 'js-base64';
import * as cheerio from 'cheerio';

import { calculateLanguage } from 'src/utils/Calculate';
import { Enums } from 'src/utils';

class GitService {
  async findRepoList(username: string) {
    const apiData = await axios.get(Enums.openAPIUrl.GITREPOLISTAPI(username));
    const result = apiData.data.map((v: any) => ({ name: v.name, url: v.html_url }));
    return result;
  }

  async findRepo(githubUsername: string, repoName: string) {
    const apiData = (await axios.get(Enums.openAPIUrl.GITREPOINFOAPI(githubUsername, repoName)))
      .data;
    const readmeData = (
      await axios.get(Enums.openAPIUrl.GITREPOREADMEAPI(githubUsername, repoName))
    ).data;
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

  async findContribution(githubUsername: string) {
    const result: { [key: string]: number } = {};
    const getHtml = await axios.get(Enums.openAPIUrl.GITURL(githubUsername));
    const $ = cheerio.load(getHtml.data);
    const $itemList = $('.js-calendar-graph-svg > g')
      .children('g')
      .children('.ContributionCalendar-day');
    $itemList.each(function check() {
      const date = $(this).attr('data-date');
      const count = $(this).attr('data-count');
      if (date && count) {
        result[date] = +count;
      }
    });
    return result;
  }
}

export default new GitService();
