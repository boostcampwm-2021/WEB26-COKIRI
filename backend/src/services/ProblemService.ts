import axios from 'axios';

class ProblemService {
  static async getSearchSuggestions(query: string) {
    const url = 'https://solved.ac/api/v3/search/suggestion';
    const result = await axios.get(url, { params: { query } });
    return result.data.problems.map((problem: { id: number; title: string }) => ({
      id: problem.id,
      title: problem.title,
    }));
  }

  static async getProblemShow(problemID: string) {
    const url = 'https://solved.ac/api/v3/problem/show';
    const result = await axios.get(url, { params: { problemId: problemID } });
    // @TODO 문제 결과 다듬기
    return result.data;
  }
}

export default ProblemService;
