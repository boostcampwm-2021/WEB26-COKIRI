import { User } from 'src/models';
import { User as UserType, UserAuthProvider } from 'src/types';

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists({ username: user.username, _id: user.userID });
    return result;
  }

  static async findOneUserForProvider(
    userAuthProvider: UserAuthProvider,
  ): Promise<UserType | undefined> {
    const result = await User.findOne(userAuthProvider).select({
      _id: true,
      username: true,
    });
    if (result === null) return undefined;
    return { userID: result._id.toString(), username: result.username! };
  }

  static async findOrCreateUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserType> {
    const user = await UserService.findOneUserForProvider(userAuthProvider);
    if (!user) {
      const newUser = await User.create({ ...userAuthProvider });
      return { userID: newUser._id.toString(), username: '' };
    }
    return user;
  }
}

export default UserService;
