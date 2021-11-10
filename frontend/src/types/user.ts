export default interface UserType {
  _id?: string;
  name?: string;
  username?: string;
  isRegistered?: boolean;
  token?: string;
  followerCount?: number;
  followCount?: number;
}
