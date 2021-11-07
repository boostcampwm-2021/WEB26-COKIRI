import { User } from 'src/models';
import { User as UserType } from 'src/types';

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists({ username: user.username, _id: user.userID });
    return result;
  }

  static async findOneUser(user: {
    authProvider: string;
    providerID: string;
  }): Promise<UserType | undefined> {
    const result = await User.findOne(user).select({
      _id: true,
      username: true,
    });
    if (result === null) return undefined;
    return { userID: result._id.toString(), username: result.username! };
  }
}

export default UserService;
