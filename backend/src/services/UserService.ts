import { nanoid } from 'nanoid';

import { User } from 'src/models';
import { User as UserType, UserAuthProvider } from 'src/types';
import { UserType as UserSchemaType } from 'src/types/modelType';
import { Types } from 'mongoose';

interface UserConfigType extends Omit<UserSchemaType, 'languages'> {
  languages: string[];
}

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists(user);
    return result;
  }

  static async existsRegisteredUser(user: UserType): Promise<boolean> {
    const result = await User.findOne(user).select({
      isRegistered: true,
    });
    if (!result) return false;
    return result.isRegistered!;
  }

  static async existsUserForUsername(user: { username: string }): Promise<boolean> {
    const result = await User.exists({ username: user.username });
    return result;
  }

  static async findOneUserForProvider(
    userAuthProvider: UserAuthProvider,
  ): Promise<UserType | undefined> {
    const result = await User.findOne(userAuthProvider).select({
      _id: true,
    });
    if (result === null) return undefined;
    return { userID: result._id.toString() };
  }

  static async findOrCreateUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserType> {
    const user = await UserService.findOneUserForProvider(userAuthProvider);
    if (!user) {
      const newUser = await User.create({ ...userAuthProvider, username: nanoid(20) });
      return { userID: newUser._id.toString() };
    }
    return user;
  }

  static async findOneUserForID(user: UserType) {
    const result = await User.findOne(user).select({ _id: true, isRegistered: true });
    return result;
  }

  static async updateOneUserConfig<Type extends UserConfigType>(user: UserType, userConfig: Type) {
    const userConfigSchema: UserSchemaType = { ...userConfig, languages: [] };
    userConfigSchema.languages = userConfig.languages?.map((language) => ({
      languageID: new Types.ObjectId(language),
    }));
    await User.updateOne({ _id: user.userID }, userConfigSchema);
  }
}

export default UserService;
