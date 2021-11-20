import { nanoid } from 'nanoid';

import { User } from 'src/models';
import { User as UserType, UserAuthProvider, ObjectType, DashboardType } from 'src/types';
import { UserType as UserSchemaType } from 'src/types/modelType';
import { ERROR, AUTH, ObjectID } from 'src/utils';

class UserService {
  async existsUser(user: UserType): Promise<boolean> {
    return User.exists({ _id: user.userID });
  }

  async existGithubUser(userID: string): Promise<boolean> {
    return User.exists({ _id: userID });
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

  async findGithubUsername(userID: string) {
    const data: any = await User.findOne({ _id: userID }, 'githubUsername -_id');
    return data.githubUsername;
  }

  async findOneUserVelogToken(userID: string) {
    return User.findOne({ _id: userID }, 'blogAuthentication.velog -_id').lean();
  }

  async findUserGithubUsername(userID: string): Promise<string | undefined> {
    const result = await User.findOne({ _id: userID }, 'githubUsername -_id');
    if (result === null) return undefined;
    return result.githubUsername;
  }

  async findOneUserTistoryAccessToken(userID: string) {
    const user = await User.findOne({ _id: userID }, 'blogAuthentication.tistory -_id').lean();
    if (!user) {
      throw new Error(ERROR.NO_USERS);
    }
    if (!user.blogAuthentication || !user.blogAuthentication!.tistory) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
    return user.blogAuthentication!.tistory;
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
      throw new Error(ERROR.NO_USERS);
    }
    return result;
  }

  async findOneUserProfileForUsername(username: string) {
    const result: UserSchemaType[] = await User.find(
      { username },
      'username isRegistered name profileImage bio',
    ).lean();
    if (result.length === 0) {
      throw new Error(ERROR.NO_USERS);
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
      blogAuthentication: false,
    });
  }

  async findRandomUserSuggestions(userID: string) {
    const result: UserSchemaType[] = await User.aggregate([
      { $match: { _id: { $nin: [ObjectID.stringToObjectID(userID)] }, isRegistered: true } },
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
      throw new Error(ERROR.NO_USERS);
    }
    return result;
  }

  async findOneUserDashboard(username: string) {
    const userDashboard = await User.findOne({ username }, 'dashboard -_id');
    if (!userDashboard) {
      throw new Error(ERROR.NO_USERS);
    }
    return userDashboard;
  }

  async updateOneUserVelogAuthentication(nanoID: string, userID: string) {
    return User.updateOne(
      { _id: userID },
      {
        'blogAuthentication.velog': {
          token: nanoID,
          ttl: Number(process.env.VELOG_TOKEN_TTL),
          createdAt: Date.now(),
        },
      },
    );
  }

  async updateGithubUserInfo(userID: string, info: any) {
    return User.findOneAndUpdate({ _id: userID }, info, { new: true });
  }

  async updateOneUserConfig(userID: string, userConfig: ObjectType<UserSchemaType>) {
    const blockList = AUTH.SETTING_BLOCK_LIST;
    if (!userConfig.username) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    blockList.forEach((property: string) => {
      if (userConfig[property as keyof UserSchemaType]) {
        throw new Error(ERROR.WRONG_BODY_TYPE);
      }
    });
    await User.updateOne(
      { _id: userID },
      { ...userConfig, isRegistered: true },
      { runValidators: true, upsert: true },
    );
  }

  async updateOneUserDashboard(userID: string, dashboard: DashboardType) {
    return User.updateOne({ _id: userID }, { dashboard });
  }
}

export default new UserService();
