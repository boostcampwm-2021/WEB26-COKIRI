import axios from 'axios';
import * as cheerio from 'cheerio';

import { CRAWLING, ERROR, OPENAPIURL, PROBLEMTEAR } from 'src/utils';
import { ObjectType } from 'src/types';

class ProblemService {
  convertLevelToTear(level: number) {
    const value = level / Number(PROBLEMTEAR);
    const surplus = level % Number(PROBLEMTEAR);
    if (value === 0 && surplus === 0) return 'Unrated';
    const metalTear = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
    return metalTear[Math.floor(value)] + (Number(PROBLEMTEAR) - surplus + 1).toString();
  }

  async findSearchSuggestions(query: string) {
    const url = OPENAPIURL.PROBLEM_SEARCH_SUGGESTION;
    const result = await axios.get(url, { params: { query } });
    return (result.data.problems as { id: number; title: string }[]).map(
      (problem: { id: number; title: string }) => ({
        id: problem.id,
        title: problem.title,
      }),
    );
  }

  async findProblemContent(problemID: string) {
    const url = OPENAPIURL.PROBLEM_SHOW;
    try {
      const [problemInfo, problemHTML] = await Promise.all([
        axios.get(url, { params: { problemId: problemID } }),
        axios.get(`${OPENAPIURL.PROBLEM}${problemID}`),
      ]);
      const $ = cheerio.load(problemHTML.data);
      const problemDescription = $('div#problem_description').html()!.trim();
      return {
        title: problemInfo.data.titleKo,
        external: {
          type: 'problem',
          identity: 'baekjoon',
          target: problemID,
          content: problemDescription.replace(
            /(?<=(<img[^/]+src="))\//g,
            OPENAPIURL.PROBLEM_IMAGE_HOST,
          ),
          link: `${OPENAPIURL.PROBLEM}${problemID}`,
          info: {
            solvedUserCount: problemInfo.data.acceptedUserCount,
            totalTryCount: Math.floor(
              problemInfo.data.averageTries * problemInfo.data.acceptedUserCount,
            ),
            tear: this.convertLevelToTear(problemInfo.data.level),
          },
        },
      };
    } catch (error) {
      throw new Error(ERROR.NOT_EXIST_PROBLEM);
    }
  }

  async findSolvedAcStatistics(username: string) {
    const url = OPENAPIURL.PROBLEM_STATISTICS;
    const solvedProfileHTML = (await axios.get(`${url}${username}`)).data;
    const $ = cheerio.load(solvedProfileHTML);
    const $tag = $('div.ProfileSolvedStatsCardstyles__DataContainer-sc-1bmfkr8-1.hPtyHi').last();
    if ($tag.length === 0) {
      throw new Error(ERROR.INVALID_SOLVED);
    }
    const statistics: ObjectType<any> = {};
    const statisticsKeys: string[] = [];
    const categories = $tag.find(CRAWLING.SOLVED_CATEGORIES);
    const exps = $tag.find(CRAWLING.SOLVED_CATEGORY_EXPS);

    categories.each((index, category) => {
      if (index > 9) return false;
      if (index !== 0) {
        const textCategory = $(category).text().substr(2);
        statistics[textCategory] = '';
        statisticsKeys.push(textCategory);
      }
      return true;
    });

    exps.each((index, exp) => {
      if (index > 9) return false;
      if (index !== 0) {
        const expText = $(exp).text();
        statistics[statisticsKeys[index - 1]] = expText;
      }
      return true;
    });
    return statistics;
  }
}

export default new ProblemService();
