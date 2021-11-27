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

async function run<R>(requestConfig: AxiosRequestConfig): Promise<ReturnType<R>> {
  const url = `${baseURL}/${version}/${requestConfig.url}`;
  const result = await axios.request<R>({ ...requestConfig, url });
  return result.data!;
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

function get<R>(config: AxiosRequestConfig): Promise<ReturnType<R>> {
  return run({ ...config, method: 'GET' });
}

// eslint-disable-next-line no-unused-vars
function post<R>(config: AxiosRequestConfig): Promise<ReturnType<R>> {
  return run({ ...config, method: 'POST' });
}

function put<R>(config: AxiosRequestConfig): Promise<ReturnType<R>> {
  return run({ ...config, method: 'PUT' });
}

// eslint-disable-next-line no-unused-vars
function del<R>(config: AxiosRequestConfig): Promise<ReturnType<R>> {
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
}) {
  return run<R>({ ...config, headers: getAuthHeader(config), method: 'POST' });
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
    return result.data!;
  },

  async getUsersByUsername(token: string, username: string) {
    const result = await getWithAuth<UserType>({ url: 'users', token, params: { username } });
    return result.data!;
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
    return result.data!;
  },

  async getUserPosts(user: UserType, { pageParam }: QueryFunctionContext) {
    if (user._id === undefined) {
      return {};
    }
    return get<PostType[]>({ url: `users/${user._id}/posts`, params: { cursor: pageParam ?? 0 } });
  },

  async getSearch(query: string) {
    const result = await get<UserType[]>({ url: 'search', params: { query } });
    return result.data!;
  },

  async getIsExistUsername(username: string) {
    const result = await get<boolean>({ url: 'users', params: { query: username } });
    return result.data!;
  },

  async getUserSuggestions(user: UserType) {
    if (user._id === undefined || !user.isRegistered) {
      return [];
    }
    const result = await getWithAuth<UserType[]>({
      url: `users/${user._id}/suggestions`,
      token: user.token!,
    });
    return result.data!;
  },

  getRandomPosts({ pageParam }: QueryFunctionContext) {
    return get<PostType[]>({ url: 'posts/random', params: { cursor: pageParam ?? 0 } });
  },

  async getDetailPost(postID: string) {
    const result = await get<PostType>({ url: `posts/${postID}` });
    return result.data!;
  },

  async getUserRepos(user: UserType) {
    const result = await getWithAuth<RepoType[]>({
      url: `users/${user._id}/repositories`,
      token: user.token!,
    });
    return result.data!;
  },

  async getUserRepo(user: UserType, repoName: string) {
    const result = await getWithAuth<ExternalType>({
      url: `users/${user._id}/repositories/${repoName}`,
      token: user.token!,
    });
    return result.data!;
  },

  async getUserFollows(targetUserID: string) {
    const result = await get<UserType[]>({ url: `users/${targetUserID}/follows` });
    return result.data!;
  },

  async getUserFollowers(targetUserID: string) {
    const result = await get<UserType[]>({ url: `users/${targetUserID}/followers` });
    return result.data!;
  },

  async getProblems(query: string) {
    const result = await get<ProblemType[]>({ url: 'problems', params: { query } });
    return result.data!;
  },

  async getProblem(id: string) {
    const result = await get<ExternalType>({ url: `problems/${id}` });
    return result.data!;
  },

  async getUserBlogs(user: UserType) {
    const result = await getWithAuth<BlogType[]>({
      url: `users/${user._id}/blogs`,
      token: user.token!,
    });
    return result.data!;
  },

  async getUserBlog(user: UserType, identity: string, postID: string) {
    const result = await getWithAuth<ExternalType>({
      url: `users/${user._id}/tistory/${identity}/posts/${postID}`,
      token: user.token!,
    });
    return result.data!;
  },

  async getDashboardUserInfo(username: string) {
    const result = await get<DashboardUserInfoType>({
      url: `users/dashboard?username=${username}`,
    });
    return result.data!;
  },

  async getTistoryAuthURL(user: UserType, redirectURI: string) {
    const result = await getWithAuth<string>({
      url: 'socials/tistory',
      token: user.token!,
      params: { redirect_uri: redirectURI },
    });
    return result.data!;
  },

  async getDashboardRepo(userID: string) {
    const result = await get<RepoType[]>({ url: `users/${userID}/dashboard/repositories` });
    return result.data!;
  },

  async getDashboardLanguageStatistics(userID: string) {
    const result = await get<StatisticsType>({
      url: `users/${userID}/dashboard/repositories/languages`,
    });
    return result.data!;
  },

  async getTechStacksSearch(query: string) {
    const result = await get<StackType[]>({ url: `techStacks/search?query=${query}` });
    return result.data!;
  },

  async getProblemStatistics(userID: string): Promise<StatisticsType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${userID}/dashboard/problems/statistics`,
    );
    return result.data.data;
  },

  async postPost(user: UserType, content: string, images: string[], external?: ExternalType) {
    const result = await postWithAuth<PostType>({
      url: 'posts',
      data: { userID: user._id, content, images, external },
      token: user.token!,
    });
    return result.data!;
  },

  async getUserNotifications(user: UserType) {
    const result = await getWithAuth<NotificationType[]>({
      url: `users/${user._id}/notifies`,
      token: user.token!,
    });
    return result.data!;
  },

  async postPostLike(user: UserType, postID: string) {
    const result = await postWithAuth<LikeType>({
      url: `posts/${postID}/likes`,
      data: { userID: user._id },
      token: user.token!,
    });
    return result.data!;
  },

  async postPostComment(user: UserType, postID: string, content: string) {
    const result = await postWithAuth<CommentType>({
      url: `posts/${postID}/comments`,
      data: { userID: user._id, content },
      token: user.token!,
    });
    return result.data!;
  },

  async postCommentLike(user: UserType, postID: string, commentID: string) {
    const result = await postWithAuth<LikeType>({
      url: `posts/${postID}/comments/${commentID}/likes`,
      data: { userID: user._id },
      token: user.token!,
    });
    return result.data!;
  },

  async postDashboardHistory(user: UserType, content: string, date: string) {
    const result = await postWithAuth<HistoryType>({
      url: `users/${user._id}/dashboard/histories`,
      data: { content, date },
      token: user.token!,
    });
    return result.data!;
  },

  async postDashboardRepo(user: UserType, repoName: string) {
    const result = await postWithAuth<RepoType>({
      url: `users/${user._id}/dashboard/repositories/${repoName}`,
      data: { userID: user._id },
      token: user.token!,
    });
    return result.data!;
  },

  async postUserFollow(user: UserType, targetUserID: string) {
    await postWithAuth<void>({
      url: `users/${targetUserID}/follows`,
      data: { userID: user._id },
      token: user.token!,
    });
  },

  async putUserSettings(user: UserType, newUser: UserType) {
    await putWithAuth<void>({
      url: `/users/${user._id}/settings`,
      data: {
        username: newUser.username,
        name: newUser.name,
        profileImage: newUser.profileImage,
        bio: newUser.bio,
      },
      token: user.token!,
    });
  },

  async putDashboardUserInfo(user: UserType, dashboard: DashboardUserInfoType) {
    const result = await putWithAuth<DashboardUserInfoType>({
      url: `users/${user._id}/dashboard`,
      data: {
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
        solvedac: dashboard.solvedac || undefined,
      },
      token: user.token!,
    });
    return result.data!;
  },

  async putDashboardRepoLanguages(user: UserType) {
    const result = await putWithAuth<UserType>({
      url: `users/${user._id}/dashboard/repositories/languages`,
      token: user.token!,
    });
    return result.data!;
  },

  async putSolvedacStatistics(userID: string, solvedUsername: string) {
    const result = await put<StatisticsType>({
      url: `users/${userID}/problems/${solvedUsername}/statistics`,
    });
    return result.data!;
  },

  async deletePostLike(user: UserType, postID: string, likeID: string) {
    await deleteWithAuth<void>({
      url: `posts/${postID}/likes/${likeID}`,
      data: { userID: `${user._id}` },
      token: user.token!,
    });
  },

  async deleteUserFollow(user: UserType, targetUserID: string) {
    await deleteWithAuth<void>({
      url: `users/${targetUserID}/follows`,
      data: { userID: user._id },
      token: user.token!,
    });
  },

  async deleteCommentLike(user: UserType, postID: string, commentID: string, likeID: string) {
    await deleteWithAuth<void>({
      url: `posts/${postID}/comments/${commentID}/likes/${likeID}`,
      data: { userID: `${user._id}` },
      token: user.token!,
    });
  },

  async deletePost(user: UserType, postID: string) {
    await deleteWithAuth<void>({
      url: `posts/${postID}`,
      data: { userID: `${user._id}` },
      token: user.token!,
    });
  },

  async deleteComment(user: UserType, postID: string, commentID: string) {
    await deleteWithAuth<void>({
      url: `posts/${postID}/comments/${commentID}`,
      data: { userID: `${user._id}` },
      token: user.token!,
    });
  },

  async deleteDashboardHistory(user: UserType, historyID: string) {
    await deleteWithAuth({
      url: `users/${user._id}/dashboard/histories`,
      data: { historyID },
      token: user.token!,
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
