export default interface UserType {
  _id?: string;
  name?: string;
  bio?: string;
  profileImage?: string;
  username?: string;
  isRegistered?: boolean;
  token?: string;
  postCount?: number;
  followerCount?: number;
  followCount?: number;
  followers?: string[];
  follows?: string[];
}
