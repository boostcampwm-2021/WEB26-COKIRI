export const AUTH = {
  SETTING_BLOCK_LIST: [
    'githubUsername',
    'tistoryAccessToken',
    'tistoryURL',
    'authProvider',
    'authProviderID',
    'createdAt',
    'lastVisitedAt',
    'dashboard',
  ],
};

export const RESPONSECODE = {
  SUCCESS: 'Success',
  OVERLAP: 'Overlap Request',
};

export const ERROR = {
  PERMISSION_DENIED: 'Permission Denied.',
  WRONG_QUERY_TYPE: 'Query 형태가 잘못 되었습니다.',
  WRONG_PARAMS_TYPE: 'Params 형태가 잘못 되었습니다.',
  WRONG_BODY_TYPE: 'Body 형태가 잘못 되었습니다.',
  NO_USERS: '사용자가 존재하지 않습니다.',
  NO_POSTS: '게시글이 존재하지 않습니다.',
  NO_COMMENTS: '댓글이 존재하지 않습니다.',
  NO_QUERY: '검색 내용이 존재하지 않습니다.',
  NO_GITHUBUSERNAME: '깃허브 인증이 필요합니다.',
};

export const OPENAPIURL = {
  PROBLEM_SEARCH_SUGGESTION: 'https://solved.ac/api/v3/search/suggestion',
  PROBLEM_SHOW: 'https://solved.ac/api/v3/problem/show',
  TISTORY_AUTHORIZATION: 'https://www.tistory.com/oauth/authorize',
  TISTORY_ACCESS_TOKEN: 'https://www.tistory.com/oauth/access_token',
  TISTORY_INFO: 'https://www.tistory.com/apis/blog/info',
  GIT_REPOLIST_API: (username: string) => `https://api.github.com/users/${username}/repos`,
  GIT_REPOINFO_API: (githubUsername: string, repoName: string) =>
    `https://api.github.com/repos/${githubUsername}/${repoName}`,
  GIT_REPOREADME_API: (githubUsername: string, repoName: string) =>
    `https://api.github.com/repos/${githubUsername}/${repoName}/readme`,
  GIT_URL: (username: string) => `https://github.com/${username}`,
};

export const SELECT = {
  USER: 'username profileImage',
};

export const PERPAGE = 20;
