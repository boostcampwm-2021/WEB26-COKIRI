class Enums {
  error = {
    PERMISSION_DENIED: 'Permission Denied.',
    WRONG_QUERY_TYPE: 'Query 형태가 잘못 되었습니다.',
    WRONG_PARAMS_TYPE: 'Params 형태가 잘못 되었습니다.',
    WRONG_BODY_TYPE: 'Body 형태가 잘못 되었습니다.',
    NO_USERS: '사용자가 존재하지 않습니다.',
  };

  openAPIUrl = {
    PROBLEM_SEARCH_SUGGESTION: 'https://solved.ac/api/v3/search/suggestion',
    PROBLEM_SHOW: 'https://solved.ac/api/v3/problem/show',
  };
}

export default new Enums();
