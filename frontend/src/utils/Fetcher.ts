import axios from 'axios';
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
} from 'src/types';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const version = 'v1';

class Fetcher {
  // for server side
  static async getUsersMe(token: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/${version}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data.data;
    } catch (error) {
      return {};
    }
  }

  static async getUsersByUsername(token: string, username: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/${version}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { username },
      });
      return result.data.data;
    } catch (error) {
      return {};
    }
  }

  // for client side
  static async getPosts(
    user: UserType,
    { pageParam }: QueryFunctionContext,
  ): Promise<ReturnType<PostType[]>> {
    if (user._id === undefined || !user.isRegistered) {
      return {};
    }
    const result = await axios.get(`${baseURL}/${version}/posts`, {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { user_id: user._id, cursor: pageParam ?? 0 },
    });
    return result.data;
  }

  static async getPostLikes(user: UserType, postID: string): Promise<LikeType[]> {
    const result = await axios.get(`${baseURL}/${version}/posts/${postID}/likes`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getUserPosts(
    user: UserType,
    { pageParam }: QueryFunctionContext,
  ): Promise<ReturnType<PostType[]>> {
    if (user._id === undefined) {
      return {};
    }
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/posts`, {
      params: { cursor: pageParam ?? 0 },
    });
    return result.data;
  }

  static async getSignout(): Promise<void> {
    await axios.get(`${baseURL}/${version}/users/logout`);
  }

  static async getSearch(query: string): Promise<UserType[]> {
    const result = await axios.get(`${baseURL}/${version}/search`, {
      params: { query },
    });
    return result.data.data;
  }

  static async getIsExistUsername(username: string) {
    const result = await axios.get(`${baseURL}/${version}/users`, {
      params: { query: username },
    });
    return result.data.data;
  }

  static async getUserSuggestions(user: UserType): Promise<UserType[]> {
    if (user._id === undefined || !user.isRegistered) {
      return [];
    }
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/suggestions`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getRandomPosts({
    pageParam,
  }: QueryFunctionContext): Promise<ReturnType<PostType[]>> {
    const result = await axios.get(`${baseURL}/${version}/posts/random`, {
      params: { cursor: pageParam ?? 0 },
    });
    return result.data;
  }

  static async getDetailPost(postID: string): Promise<PostType> {
    const result = await axios.get(`${baseURL}/${version}/posts/${postID}`);
    return result.data.data;
  }

  static async getUserRepos(user: UserType): Promise<RepoType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/repositories`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getUserRepo(user: UserType, repoName: string): Promise<ExternalType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${user._id}/repositories/${repoName}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data.data;
  }

  static async getUserFollows(targetUserID: string) {
    const result = await axios.get(`${baseURL}/${version}/users/${targetUserID}/follows`);
    return result.data.data;
  }

  static async getUserFollowers(targetUserID: string) {
    const result = await axios.get(`${baseURL}/${version}/users/${targetUserID}/followers`);
    return result.data.data;
  }

  static async getProblems(query: string): Promise<ProblemType[]> {
    const result = await axios.get(`${baseURL}/${version}/problems`, {
      params: { query },
    });
    return result.data.data;
  }

  static async getProblem(id: string): Promise<ExternalType> {
    const result = await axios.get(`${baseURL}/${version}/problems/${id}`);
    return result.data.data;
  }

  static async getUserBlogs(user: UserType): Promise<BlogType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/blogs`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getUserBlog(
    user: UserType,
    identity: string,
    postID: string,
  ): Promise<ExternalType> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${user._id}/tistory/${identity}/posts/${postID}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data.data;
  }

  static async getDashboardUserInfo(username: string): Promise<ReturnType<DashboardUserInfoType>> {
    const result = await axios.get(`${baseURL}/${version}/users/dashboard?username=${username}`);
    return result.data;
  }

  static async getTistoryAuthURL(user: UserType, redirectURI: string): Promise<string> {
    const result = await axios.get(`${baseURL}/${version}/socials/tistory`, {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { redirect_uri: redirectURI },
    });
    return result.data.data;
  }

  static async getLogout() {
    window.open(`${baseURL}/${version}/users/logout`, '_self');
  }

  static async getDashboardRepo(userID: string): Promise<ReturnType<RepoType[]>> {
    const result = await axios.get(`${baseURL}/${version}/users/${userID}/dashboard/repositories`);
    return result.data;
  }

  static async getDashboardLanguageStatistics(userID: string): Promise<ReturnType<StatisticsType>> {
    const result = await axios.get(
      `${baseURL}/${version}/users/${userID}/dashboard/repositories/languages`,
    );
    return result.data;
  }

  static async getTechStacksSearch(query: string): Promise<StackType[]> {
    const result = await axios.get(`${baseURL}/${version}/techStacks/search?query=${query}`);
    return result.data.data;
  }

  static async postPost(
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
  }

  static async getUserNotifications(user: UserType): Promise<NotificationType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/notifies`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    return result.data.data;
  }

  static async postPostLike(user: UserType, postID: string): Promise<ReturnType<LikeType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts/${postID}/likes`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  }

  static async postPostComment(
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
  }

  static async postCommentLike(
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
  }

  static async postDashboardHistory(
    user: UserType,
    content: string,
    date: string,
  ): Promise<HistoryType> {
    const result = await axios.post(
      `${baseURL}/${version}/users/${user._id}/dashboard/histories`,
      { content, date },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  }

  static async postDashboardRepo(user: UserType, repoName: string): Promise<ReturnType<RepoType>> {
    const result = await axios.post(
      `${baseURL}/${version}/users/${user._id}/dashboard/repositories/${repoName}`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  }

  static async putUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.post(
      `${baseURL}/${version}/users/${targetUserID}/follows`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  }

  static async putUserSettings(user: UserType, newUser: UserType): Promise<void> {
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
  }

  static async putDashboardUserInfo(
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
        solvedac: dashboard.solvedac || undefined,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data.data;
  }

  static async putDashboardRepoLanguages(user: UserType): Promise<ReturnType<UserType>> {
    const result = await axios.put(
      `${baseURL}/${version}/users/${user._id}/dashboard/repositories/languages`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    return result.data;
  }

  static async putSolvedacStatistics(
    userID: string,
    solvedUsername: string,
  ): Promise<ReturnType<StatisticsType>> {
    const result = await axios.put(
      `${baseURL}/${version}/users/${userID}/problems/${solvedUsername}/statistics`,
    );
    return result.data;
  }

  static async deletePostLike(user: UserType, postID: string, likeID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}/likes/${likeID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  static async deleteUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/users/${targetUserID}/follows`, {
      data: { userID: user._id },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  static async deleteCommentLike(
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
  }

  static async deletePost(user: UserType, postID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  static async deleteComment(user: UserType, postID: string, commentID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/posts/${postID}/comments/${commentID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  static async deleteDashboardHistory(user: UserType, historyID: string): Promise<void> {
    await axios.delete(`${baseURL}/${version}/users/${user._id}/dashboard/histories`, {
      data: { historyID },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}

export default Fetcher;
