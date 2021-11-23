/* eslint camelcase: 0 */
import axios from 'axios';
import * as cheerio from 'cheerio';

import { Calculate, OPENAPIURL, HEADER, ERROR } from 'src/utils';
import { DashboardRepositoryType } from 'src/types';

class GitService {
  async findRepoList(username: string) {
    const apiData = await axios.get(OPENAPIURL.GIT_REPOLIST_API(username));
    const result = apiData.data.map((v: any) => ({ name: v.name, url: v.html_url }));
    return result;
  }

  async findRepo(githubUsername: string, repoName: string) {
    let apiData;
    try {
      apiData = await axios
        .get(OPENAPIURL.GIT_REPOINFO_API(githubUsername, repoName))
        .then((response) => response.data);
    } catch {
      throw new Error(ERROR.NOT_EXIST_REPONAME);
    }

    const { name, html_url, stargazers_count, forks_count, languages_url } = apiData;
    const result: DashboardRepositoryType = {
      repoName: name,
      repoUrl: html_url,
      starCount: stargazers_count,
      forkCount: forks_count,
    };

    const languageData = (await axios.get(languages_url)).data;
    if (Object.keys(languageData).length !== 0) {
      const languageInfo = Calculate.calculateLanguage(languageData);
      result.languageInfo = languageInfo;
    }

    try {
      const readmeData = await axios
        .get(OPENAPIURL.GIT_REPOREADME_API(githubUsername, repoName), {
          headers: HEADER.GITHUB_README,
        })
        .then((response) => response.data);
      result.content = readmeData;
    } catch {
      return result;
    }

    return result;
  }

  async findContribution(githubUsername: string) {
    const result: { [key: string]: number } = {};
    const getHtml = await axios.get(OPENAPIURL.GIT_URL(githubUsername));
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
