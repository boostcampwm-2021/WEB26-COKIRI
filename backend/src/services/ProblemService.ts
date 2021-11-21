import axios from 'axios';
import * as cheerio from 'cheerio';

import { OPENAPIURL, PROBLEMTEAR } from 'src/utils';

class ProblemService {
  getProblemTear(level: number) {
    const value = level / Number(PROBLEMTEAR);
    const surplus = level % Number(PROBLEMTEAR);
    if (value === 0 && surplus === 0) return 'Unrated';
    const metalTear = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
    return metalTear[Math.floor(value)] + (Number(PROBLEMTEAR) - surplus + 1).toString();
  }

  async getSearchSuggestions(query: string) {
    const url = OPENAPIURL.PROBLEM_SEARCH_SUGGESTION;
    const result = await axios.get(url, { params: { query } });
    return (result.data.problems as { id: number; title: string }[]).map(
      (problem: { id: number; title: string }) => ({
        id: problem.id,
        title: problem.title,
      }),
    );
  }

  async getProblemContent(problemID: string) {
    const url = OPENAPIURL.PROBLEM_SHOW;
    const [problemInfo, problemHTML] = await Promise.all([
      axios.get(url, { params: { problemId: problemID } }),
      axios.get(`${OPENAPIURL.PROBLEM}${problemID}`),
    ]);
    const $ = cheerio.load(problemHTML.data);
    const problemDescription = $('div#problem_description').html()!.trim();
    return {
      title: problemInfo.data.titleKo,
      solvedUserCount: problemInfo.data.acceptedUserCount,
      averageTries: problemInfo.data.averageTries,
      tear: this.getProblemTear(problemInfo.data.level),
      link: `${OPENAPIURL.PROBLEM}${problemID}`,
      externalContent: problemDescription,
      external: {
        type: 'algorithm',
        identity: 'baekjon',
        target: problemID,
      },
    };
  }
}

export default new ProblemService();
