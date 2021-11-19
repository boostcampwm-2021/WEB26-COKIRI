import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

import { UserType, PostType, LikeType, ReturnType, CommentType, RepoType } from 'src/types';

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
  static async getPosts(user: UserType, { pageParam }: QueryFunctionContext): Promise<PostType[]> {
    // @TODO 리턴타입 변경
    if (user._id === undefined || !user.isRegistered) {
      return [];
    }
    const result = await axios.get(`${baseURL}/${version}/posts`, {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { user_id: user._id, cursor: pageParam ?? 0 },
    });
    return result.data.data;
  }

  static async getPostLikes(user: UserType, postID: string): Promise<LikeType[]> {
    const result = await axios.get(`${baseURL}/${version}/posts/${postID}/likes`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getUserPosts(user: UserType): Promise<PostType[]> {
    if (user._id === undefined) {
      return [];
    }
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/posts`);
    return result.data.data;
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

  static async getUserSuggestions(user: UserType): Promise<UserType[]> {
    if (user._id === undefined || !user.isRegistered) {
      return [];
    }
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/suggestions`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async getRandomPosts(): Promise<PostType[]> {
    const result = await axios.get(`${baseURL}/${version}/posts/random`);
    return result.data.data;
  }

  static async getDetailPost(postID: string | string[]): Promise<PostType> {
    const result = await axios.get(`${baseURL}/${version}/posts/${postID}`);
    return result.data.data;
  }

  static async getUserRepos(user: UserType): Promise<RepoType[]> {
    const result = await axios.get(`${baseURL}/${version}/users/${user._id}/repositories`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data.data;
  }

  static async postPost(
    user: UserType,
    content: string,
    images: string[],
  ): Promise<ReturnType<PostType>> {
    const result = await axios.post(
      `${baseURL}/${version}/posts`,
      { userID: user._id, content, images },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
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
}
export default Fetcher;
