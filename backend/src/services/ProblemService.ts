import axios from 'axios';
import * as cheerio from 'cheerio';

import { OPENAPIURL } from 'src/utils';

class ProblemService {
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

  async getProblemShow(problemID: string) {
    const url = OPENAPIURL.PROBLEM_SHOW;
    const result = await axios.get(url, { params: { problemId: problemID } });
    const problemHTML = (await axios.get(`${OPENAPIURL.PROBLEM}${problemID}`)).data;
    const $ = cheerio.load(problemHTML);
    const problemDescription = $('div#problem_description').html();
    console.log(problemDescription);
    // @TODO 문제 결과 다듬기
    return result.data;
  }
}

export default new ProblemService();
