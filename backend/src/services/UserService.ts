import { nanoid } from 'nanoid';

import { User } from 'src/models';
import { User as UserType, UserAuthProvider, ObjectType } from 'src/types';
import { UserType as UserSchemaType } from 'src/types/modelType';
import { Enums, ObjectID } from 'src/utils';

class UserService {
  async existsUser(user: UserType): Promise<boolean> {
    return User.exists({ _id: user.userID });
  }

  async existGithubUser(username: string): Promise<boolean> {
    return User.exists({ githubUsername: username });
  }

  async existsRegisteredUser(user: UserType): Promise<boolean> {
    const result = await User.findOne({ _id: user.userID }).select({
      isRegistered: true,
    });
    if (!result) return false;
    return result.isRegistered!;
  }

  async existsUserForUsername(query: string): Promise<boolean> {
    return User.exists({ username: query });
  }

  async findOneUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserType | undefined> {
    const result = await User.findOne(userAuthProvider).select({ _id: true });
    if (result === null) return undefined;
    return { userID: ObjectID.objectIDToString(result._id) };
  }

  async findOrCreateUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserType> {
    const user = await this.findOneUserForProvider(userAuthProvider);
    if (!user) {
      const newUser = await User.create({ ...userAuthProvider, username: nanoid(20) });
      return { userID: ObjectID.objectIDToString(newUser._id) };
    }
    return user;
  }

  async findOneUserForID(userID: string) {
    const result = await User.findOne(
      { _id: userID },
      'username isRegistered name profileImage bio',
    ).lean();
    if (!result) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result;
  }

  async findOneUserProfileForUsername(username: string) {
    const result: UserSchemaType[] = await User.find(
      { username },
      'username isRegistered name profileImage bio',
    ).lean();
    if (result.length === 0) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result[0];
  }

  async findOneUserSettingForID(userID: string) {
    return User.findOne({ _id: userID }).select({
      dashboard: false,
      notifies: false,
      follows: false,
      followers: false,
      likes: false,
      posts: false,
      isRegistered: false,
      authProviderID: false,
      tistoryAccessToken: false,
    });
  }

  async findRandomUserSuggestions(userID: string) {
    const result: UserSchemaType[] = await User.aggregate([
      { $match: { _id: { $nin: [ObjectID.stringToObjectID(userID)] } } },
      {
        $project: {
          _id: { $toString: '$_id' },
          username: '$username',
          profileImage: '$profileImage',
        },
      },
      { $sample: { size: 20 } },
    ]);
    if (result.length === 0) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result;
  }

  async updateGithubUserInfo(username: string, info: any) {
    return User.findOneAndUpdate({ githubUsername: username }, info, { new: true });
  }

  async updateOneUserConfig(userID: string, userConfig: ObjectType<UserSchemaType>) {
    const blockList = Enums.auth.SETTING_BLOCK_LIST;
    if (!userConfig.username) {
      throw new Error(Enums.error.WRONG_BODY_TYPE);
    }
    blockList.forEach((property: string) => {
      if (userConfig[property as keyof UserSchemaType]) {
        throw new Error(Enums.error.WRONG_BODY_TYPE);
      }
    });
    await User.updateOne(
      { _id: userID },
      { ...userConfig, isRegistered: true },
      { runValidators: true, upsert: true },
    );
  }
}

export default new UserService();
