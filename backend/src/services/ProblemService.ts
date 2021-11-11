import axios from 'axios';

import { Enums } from 'src/utils';

class ProblemService {
  async getSearchSuggestions(query: string) {
    const url = Enums.openAPIUrl.PROBLEM_SEARCH_SUGGESTION;
    const result = await axios.get(url, { params: { query } });
    return result.data.problems.map((problem: { id: number; title: string }) => ({
      id: problem.id,
      title: problem.title,
    }));
  }

  async getProblemShow(problemID: string) {
    const url = Enums.openAPIUrl.PROBLEM_SHOW;
    const result = await axios.get(url, { params: { problemId: problemID } });
    // @TODO 문제 결과 다듬기
    return result.data;
  }
}

export default new ProblemService();
