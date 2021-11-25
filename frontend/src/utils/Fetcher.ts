import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { QueryFunctionContext } from 'react-query';

import {
  UserType,
  PostType,
  LikeType,
  ReturnType,
  CommentType,
  RepoType,
  ProblemType,
  DashboardUserInfoType,
  ExternalType,
  BlogType,
  StatisticsType,
  HistoryType,
  StackType,
  NotificationType,
  DashboardRepoType,
  LanguageStatisticsType,
} from 'src/types';

import { NOT_EXIST_TOKEN } from 'src/globals/errors';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const version = 'v1';

async function run(requestConfig: AxiosRequestConfig) {
  const url = `${baseURL}/${version}/${requestConfig.url}`;
  const result = await axios.request({ ...requestConfig, url });
  return result.data;
}

function getAuthHeader({
  token,
  headers,
}: {
  token: string;
  headers?: AxiosRequestHeaders;
}): AxiosRequestHeaders {
  if (!token) {
    throw new Error(NOT_EXIST_TOKEN);
  }
  const authorizationHeader = { Authorization: `Bearer ${token}` };
  return headers ? { ...headers, ...authorizationHeader } : authorizationHeader;
}

function get(config: AxiosRequestConfig) {
  return run({ ...config, method: 'GET' });
}

function post(config: AxiosRequestConfig) {
  return run({ ...config, method: 'POST' });
}

function put(config: AxiosRequestConfig) {
  return run({ ...config, method: 'PUT' });
}

function del(config: AxiosRequestConfig) {
  return run({ ...config, method: 'DELETE' });
}

function getWithAuth<R, P = object>(config: {
  url: string;
  token: string;
  params?: P;
  headers?: AxiosRequestHeaders;
}): Promise<ReturnType<R>> {
  return run({ ...config, headers: getAuthHeader(config), method: 'GET' });
}

function postWithAuth<R, D = object>(config: {
  url: string;
  token: string;
  data?: D;
  headers?: AxiosRequestHeaders;
}): Promise<ReturnType<R>> {
  return run({ ...config, headers: getAuthHeader(config), method: 'POST' });
}

function putWithAuth<R, D = object>(config: {
  url: string;
  token: string;
  data?: D;
  headers?: AxiosRequestHeaders;
}): Promise<ReturnType<R>> {
  return run({ ...config, headers: getAuthHeader(config), method: 'PUT' });
}

function deleteWithAuth<R, D = object>(config: {
  url: string;
  token: string;
  data?: D;
  headers?: AxiosRequestHeaders;
}): Promise<ReturnType<R>> {
  return run({ ...config, headers: getAuthHeader(config), method: 'DELETE' });
}

const Fetcher = {
  // for server side
  async getUsersMe(token: string) {
    const result = await getWithAuth<UserType>({ url: 'users/me', token });
    return result.data;
  },

  async getUsersByUsername(token: string, username: string) {
    const result = await getWithAuth<UserType>({ url: 'users', token, params: { username } });
    return result.data;
  },

  async getDashboardUserInfo(username: string): Promise<DashboardUserInfoType> {
    try {
      const result = await axios.get(`${baseURL}/${version}/users/dashboard`, {
        params: { username },
      });
      return result.data.data;
    } catch {
      return { username: '' };
    }
  },

  async getFirstPost(user: UserType, token: string): Promise<PostType> {
    if (user._id === undefined || !user.isRegistered) {
      return {};
    }
    const result = await axios.get(`${baseURL}/${version}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { user_id: user._id, cursor: 0 },
    });
    return result.data.data[0];
  },

  // for client side
  async getPosts(user: UserType, { pageParam }: QueryFunctionContext) {
    if (user._id === undefined || !user.isRegistered) {
      return {};
    }
    return getWithAuth<PostType[]>({
      url: 'posts',
      token: user.token!,
      params: { user_id: user._id, cursor: pageParam ?? 1 },
    });
  },

  async getPostLikes(user: UserType, postID: string) {
    const result = await getWithAuth<LikeType[]>({
      url: `posts/${postID}/likes`,
      token: user.token!,
    });
    return result.data;
  },

  async getUserPosts(user: UserType, { pageParam }: QueryFunctionContext) {
    if (user._id === undefined) {
      return {};
    }
    return get({ url: `users/${user._id}/posts`, params: { cursor: pageParam ?? 0 } });
  },

  async getSearch(query: string): Promise<UserType[]> {
    const result = await axios.get(`${baseURL}/${version}/search`, {
      params: { query },
    });
    return result.data.data;
  },

  async getIsExistUsername(username: string) {
    const result = await axios.get(`${baseURL}/${version}/users`, {
      params: { query: username },
    });
    return result.data.data;
  },

  async getUserSuggestions(user: UserType): Promise<UserType[]> {
    if (user._id === undefined || !user.isRegistered) {
      return [];
    }
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/suggestions`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  },

  async getRandomPosts({ pageParam }: QueryFunctionContext): Promise<ReturnType<PostType[]>> {
    const result = await axios.get(`${baseURL}/${version}/posts/random`, {
      params: { cursor: pageParam ?? 0 },
    });
    return result.data;
  },

  async getDetailPost(postID: string): Promise<PostType> {
    const result = await axios.get(`${baseURL}/${version}/posts/${postID}`);
    return result.data.data;
  },

  async getUserRepos(user: UserType): Promise<RepoType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/repositories`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  },

  async getUserRepo(user: UserType, repoName: string): Promise<ExternalType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${user._id}/repositories/${repoName}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data.data;
  },

  async getUserFollows(targetUserID: string) {
    const result = await axios.get(`${baseURL}/${version}/users/${targetUserID}/follows`);
    return result.data.data;
  },

  async getUserFollowers(targetUserID: string) {
    const result = await axios.get(`${baseURL}/${version}/users/${targetUserID}/followers`);
    return result.data.data;
  },

  async getProblems(query: string): Promise<ProblemType[]> {
    const result = await axios.get(`${baseURL}/${version}/problems`, {
      params: { query },
    });
    return result.data.data;
  },

  async getProblem(id: string): Promise<ExternalType> {
    const result = await axios.get(`${baseURL}/${version}/problems/${id}`);
    return result.data.data;
  },

  async getUserBlogs(user: UserType): Promise<BlogType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/blogs`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  },

  async getUserBlog(user: UserType, identity: string, postID: string): Promise<ExternalType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${user._id}/tistory/${identity}/posts/${postID}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data.data;
  },

  async getDashboardUserInfo(username: string): Promise<ReturnType<DashboardUserInfoType>> {
    const result = await axios.get(`${baseURL}/${version}/users/dashboard?username=${username}`);
    return result.data;
  },

  async getTistoryAuthURL(user: UserType, redirectURI: string): Promise<string> {
    const result = await axios.get(`${baseURL}/${version}/socials/tistory`, {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { redirect_uri: redirectURI },
    });
    return result.data.data;
  },

  async getDashboardRepo(userID: string): Promise<ReturnType<RepoType[]>> {
    const result = await axios.get(`${baseURL}/${version}/users/${userID}/dashboard/repositories`);
    return result.data;
  },

  async getDashboardLanguageStatistics(userID: string): Promise<ReturnType<StatisticsType>> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${userID}/dashboard/repositories/languages`,
    );
    return result.data;
  },

  async getTechStacksSearch(query: string): Promise<StackType[]> {
    const result = await axios.get(`${baseURL}/${version}/techStacks/search?`, {
      params: { query },
    });
    return result.data.data;
  },

  async getProblemStatistics(userID: string): Promise<StatisticsType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${userID}/dashboard/problems/statistics`,
    );
    return result.data.data;
  },

  async postPost(
    user: UserType,
    content: string,
    images: string[],
    external?: ExternalType,
  ): Promise<ReturnType<PostType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts`,
      { userID: user._id, content, images, external },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async getUserNotifications(user: UserType): Promise<NotificationType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/notifies`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    return result.data.data;
  },

  async postPostLike(user: UserType, postID: string): Promise<ReturnType<LikeType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts/${postID}/likes`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async postPostComment(
    user: UserType,
    postID: string,
    content: string,
  ): Promise<ReturnType<CommentType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts/${postID}/comments`,
      { userID: user._id, content },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async postCommentLike(
    user: UserType,
    postID: string,
    commentID: string,
  ): Promise<ReturnType<LikeType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts/${postID}/comments/${commentID}/likes`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async postDashboardHistory(user: UserType, content: string, date: string): Promise<HistoryType> {
    const result = await axios.post(
      `${baseURL}/${version}/users/${user._id}/dashboard/histories`,
      { content, date },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async postDashboardRepo(user: UserType, repoName: string): Promise<ReturnType<RepoType>> {
    const result = await axios.post(
      `${baseURL}/${version}/users/${user._id}/dashboard/repositories/${repoName}`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  },

  async putUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.post(
      `${baseURL}/${version}/users/${targetUserID}/follows`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  },

  async putUserSettings(user: UserType, newUser: UserType): Promise<void> {
    await axios.put(
      `${baseURL}/${version}/users/${user._id}/settings`,
      {
        username: newUser.username,
        name: newUser.name,
        profileImage: newUser.profileImage,
        bio: newUser.bio,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  },

  async putDashboardUserInfo(
    user: UserType,
    dashboard: DashboardUserInfoType,
  ): Promise<DashboardUserInfoType> {
    const result = await axios.put(
      `${baseURL}/${version}/users/${user._id}/dashboard`,
      {
        name: dashboard.name,
        profileImage: dashboard.profileImage,
        phoneNumber: dashboard.phoneNumber,
        school: dashboard.school,
        region: dashboard.region,
        birthday: dashboard.birthday,
        jobObjectives: dashboard.jobObjectives,
        techStacks: dashboard.techStacks,
        email: dashboard.email || undefined,
        github: dashboard.github || undefined,
        blog: dashboard.blog || undefined,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data.data;
  },

  async putDashboardRepoLanguages(user: UserType): Promise<LanguageStatisticsType> {
    const result = await axios.put(
      `${baseURL}/${version}/users/${user._id}/dashboard/repositories/languages`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data.data.dashboard.statistics;
  },

  async putProblemStatistics(
    user: UserType,
    solvedacUsername: string,
  ): Promise<StatisticsType> {
    const result = await axios.put(
      `${baseURL}/${version}/users/${user._id}/dashboard/problems/${solvedacUsername}/statistics`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data.data;
  },

  async deletePostLike(user: UserType, postID: string, likeID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}/likes/${likeID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },

  async deleteUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/users/${targetUserID}/follows`, {
      data: { userID: user._id },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },

  async deleteCommentLike(
    user: UserType,
    postID: string,
    commentID: string,
    likeID: string,
  ): Promise<void> {
    await axios.delete(
      `${baseURL}/${version}/posts/${postID}/comments/${commentID}/likes/${likeID}`,
      {
        data: { userID: `${user._id}` },
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
  },

  async deletePost(user: UserType, postID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },

  async deleteComment(user: UserType, postID: string, commentID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}/comments/${commentID}`, {
      data: { userID: user._id },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },

  async deleteDashboardHistory(user: UserType, historyID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/users/${user._id}/dashboard/histories`, {
      data: { historyID },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  },

  async deleteDashboardRepo(user: UserType, repoName: string): Promise<void> {
    await axios.delete(
      `${baseURL}/${version}/users/${user._id}/dashboard/repositories/${repoName}`,
      {
        data: { userID: user._id },
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
  },
};

export default Fetcher;
