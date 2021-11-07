import { User } from 'src/models';
import { User as UserType } from 'src/types';

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists({ username: user.username, _id: user.userID });
    return result;
  }
}

export default UserService;
