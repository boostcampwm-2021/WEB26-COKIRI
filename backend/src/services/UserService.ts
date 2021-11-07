import { User } from 'src/models';
import { User as UserType, UserAuthProvider } from 'src/types';

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists({ username: user.username, _id: user.userID });
    return result;
  }

  static async findOneUserAboutProvider(
    userAuthProvider: UserAuthProvider,
  ): Promise<UserType | UserAuthProvider> {
    const result = await User.findOne(userAuthProvider).select({
      _id: true,
      username: true,
    });
    if (result === null) return userAuthProvider;
    return { userID: result._id.toString(), username: result.username! };
  }
}

export default UserService;
