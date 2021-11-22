import axios from 'axios';
import * as cheerio from 'cheerio';

import { ERROR, OPENAPIURL, PROBLEMTEAR } from 'src/utils';

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
          content: problemDescription,
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
      throw new Error(ERROR.NOT_EXIST_ALGORITHM_PROBLEM);
    }
  }
}

export default new ProblemService();
