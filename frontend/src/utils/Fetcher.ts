import axios from 'axios';

import { UserType, PostType, LikeType, ReturnType, CommentType } from 'src/types';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

class Fetcher {
  // for server side
  static async getUsersMe(token: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data;
    } catch (error) {
      return {};
    }
  }

  static async getUsersByUsername(token: string, username: string): Promise<UserType> {
    try {
      const result = await axios.get(`${baseURL}/v1/users?username=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data;
    } catch (error) {
      return {};
    }
  }

  // for client side
  static async getPosts(user: UserType): Promise<PostType[]> {
    if (user._id === undefined) {
      return [];
    }
    const result = await axios.get(`${baseURL}/v1/posts/?user_id=${user._id}&offset=${0}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data;
  }

  static async getPostLikes(user: UserType, postID: string): Promise<LikeType[]> {
    const result = await axios.get(`${baseURL}/v1/posts/${postID}/likes`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return result.data;
  }

  static async getUserPosts(user: UserType): Promise<PostType[]> {
    const result = await axios.get(`${baseURL}/v1/users/${user._id}/posts`);
    return result.data;
  }

  static async getSignout(): Promise<void> {
    await axios.get(`${baseURL}/v1/users/logout`);
  }

  static async postPost(
    user: UserType,
    content: string,
    images: string[],
  ): Promise<ReturnType<PostType>> {
    const result = await axios.post(
      `${baseURL}/v1/posts`,
      { userID: user._id, content, images },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  }

  static async postPostLike(user: UserType, postID: string): Promise<LikeType> {
    const result = await axios.post(
      `${baseURL}/v1/posts/${postID}/likes`,
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
      `${baseURL}/v1/posts/${postID}/comments`,
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
      `${baseURL}/v1/posts/${postID}/comments/${commentID}/likes`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return result.data;
  }

  static async putUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.post(
      `${baseURL}/v1/users/${targetUserID}/follows`,
      { userID: user._id },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
  }

  static async putUserSettings(user: UserType, newUser: UserType): Promise<void> {
    await axios.put(
      `${baseURL}/v1/users/${user._id}/settings`,
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
    await axios.delete(`${baseURL}/v1/posts/${postID}/likes/${likeID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }

  static async deleteUserFollow(user: UserType, targetUserID: string): Promise<void> {
    await axios.delete(`${baseURL}/v1/users/${targetUserID}/follows`, {
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
    await axios.delete(`${baseURL}/v1/posts/${postID}/comments/${commentID}/likes/${likeID}`, {
      data: { userID: `${user._id}` },
      headers: { Authorization: `Bearer ${user.token}` },
    });
  }
}
export default Fetcher;
