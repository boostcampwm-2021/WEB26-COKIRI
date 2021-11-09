import { nanoid } from 'nanoid';

import { User } from 'src/models';
import { User as UserType, UserAuthProvider, ObjectType } from 'src/types';
import { UserType as UserSchemaType } from 'src/types/modelType';
import { ObjectID } from 'src/utils';

class UserService {
  static async existsUser(user: UserType): Promise<boolean> {
    const result = await User.exists({ _id: user.userID });
    return result;
  }

  static async existsRegisteredUser(user: UserType): Promise<boolean> {
    const result = await User.findOne({ _id: user.userID }).select({
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
    return { userID: ObjectID.objectIDToString(result._id) };
  }

  static async findOrCreateUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserType> {
    const user = await UserService.findOneUserForProvider(userAuthProvider);
    if (!user) {
      const newUser = await User.create({ ...userAuthProvider, username: nanoid(20) });
      return { userID: ObjectID.objectIDToString(newUser._id) };
    }
    return user;
  }

  static async findOneUserForID(user: UserType) {
    const result = await User.findOne({ _id: user.userID }).select({
      _id: true,
      isRegistered: true,
      profileImage: true,
      username: true,
      name: true,
    });
    return result;
  }

  static async findOneUserProfileForID(userID: string) {
    const result = await User.aggregate([
      {
        $project: {
          followerCount: { $size: '$followers' },
          followCount: { $size: '$followers' },
          _id: { $toString: '$_id' },
          username: '$username',
          bio: '$bio',
          posts: '$posts',
        },
      },
      { $match: { _id: userID } },
    ]);
    return result[0];
  }

  static async updateOneUserConfig(user: UserType, userConfig: ObjectType<UserSchemaType>) {
    const blockList = ['followers', 'follows', 'posts', 'likes', 'notifies', 'dashboard'];
    if (!userConfig.username) throw new Error('잘못된 요청입니다.');
    blockList.forEach((property: string) => {
      if (userConfig[property as keyof UserSchemaType]) throw new Error('잘못된 요청입니다.');
    });
    await User.updateOne(
      { _id: user.userID },
      { ...userConfig, isRegistered: true },
      { runValidators: true },
    );
  }
}

export default UserService;
