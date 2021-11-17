export const AUTH = {
  SETTING_BLOCK_LIST: [
    'githubUsername',
    'blogAuthentication',
    'authProvider',
    'authProviderID',
    'createdAt',
    'lastVisitedAt',
    'dashboard',
  ],
};

export const RESPONSECODE = {
  SUCCESS: 'Success',
  COMPLETED_VELOG_AUTHORIZATION: 'Velog 인증에 성공하셨습니다.',
};

export const ERROR = {
  PERMISSION_DENIED: 'Permission Denied.',
  WRONG_QUERY_TYPE: 'Query 형태가 잘못 되었습니다.',
  WRONG_PARAMS_TYPE: 'Params 형태가 잘못 되었습니다.',
  WRONG_BODY_TYPE: 'Body 형태가 잘못 되었습니다.',
  NO_USERS: '사용자가 존재하지 않습니다.',
  NO_POSTS: '게시글이 존재하지 않습니다.',
  NO_COMMENTS: '댓글이 존재하지 않습니다.',
  NO_BLOGS: '연동된 블로그가 존재하지 않습니다.',
  NO_QUERY: '검색 내용이 존재하지 않습니다.',
  NO_POST_LIKES: '게시글 좋아요가 존재하지 않습니다.',
  NO_COMMENT_LIKES: '댓글 좋아요가 존재하지 않습니다.',
  NO_GITHUBUSERNAME: '깃허브 인증이 필요합니다.',
  INVALID_TISTORY_ACCESS_TOKEN: 'Tistory Access Token 이 유효하지 않습니다.',
  INVALID_REQUEST: '잘못된 요청입니다.',
  IS_NOT_EXIST_VELOG_EMAIL: 'Velog Email 을 등록하지 않은 사용자입니다.',
  IS_EXIST_VELOG: '이미 해당 Velog 을 등록한 사용자입니다.',
  EXPIRED_VELOG_TOKEN: '인증시간이 만료되었습니다.',
};

export const OPENAPIURL = {
  PROBLEM_SEARCH_SUGGESTION: 'https://solved.ac/api/v3/search/suggestion',
  PROBLEM_SHOW: 'https://solved.ac/api/v3/problem/show',
  TISTORY_AUTHORIZATION: 'https://www.tistory.com/oauth/authorize',
  TISTORY_ACCESS_TOKEN: 'https://www.tistory.com/oauth/access_token',
  TISTORY_POSTS: 'https://www.tistory.com/apis/post/list',
  TISTORY_POST_READ: 'https://www.tistory.com/apis/post/read',
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

export const VELOG_URL = (username: string) => `https://velog.io/@${username}`;
