import { nanoid } from 'nanoid';

import { User } from 'src/models';
import {
  User as UserIDType,
  UserType,
  UserAuthProvider,
  ObjectType,
  DashboardType,
} from 'src/types';
import { ERROR, AUTH, ObjectID } from 'src/utils';

class UserService {
  async existsUserForUserID(userID: string): Promise<boolean> {
    return User.exists({ _id: userID });
  }

  async existsRegisteredUser(user: UserIDType): Promise<boolean> {
    const result = await User.findOne({ _id: user.userID }).select({
      isRegistered: true,
    });
    if (!result) return false;
    return result.isRegistered!;
  }

  async existsUserForUsername(query: string): Promise<boolean> {
    return User.exists({ username: query });
  }

  async findGithubUsernameForUserID(userID: string): Promise<string | undefined> {
    const data: UserType | null = await User.findOne({ _id: userID }, 'githubUsername -_id');
    if (!data) {
      throw ERROR.NOT_EXIST_USER;
    }
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
      throw new Error(ERROR.NOT_EXIST_USER);
    }
    if (!user.blogAuthentication || !user.blogAuthentication!.tistory) {
      throw new Error(ERROR.INVALID_TISTORY_ACCESS_TOKEN);
    }
    return user.blogAuthentication!.tistory;
  }

  async findOneUserForProvider(
    userAuthProvider: UserAuthProvider,
  ): Promise<UserIDType | undefined> {
    const result = await User.findOne(userAuthProvider).select({ _id: true });
    if (result === null) return undefined;
    return { userID: ObjectID.objectIDToString(result._id) };
  }

  async findOrCreateUserForProvider(userAuthProvider: UserAuthProvider): Promise<UserIDType> {
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
      'username isRegistered name profileImage bio githubUsername',
    ).lean();
    if (!result) {
      throw new Error(ERROR.NOT_EXIST_USER);
    }
    return result;
  }

  async findOneUserProfileForUsername(username: string) {
    const result: UserType[] = await User.find(
      { username },
      'username isRegistered name profileImage bio',
    ).lean();
    if (result.length === 0) {
      throw new Error(ERROR.NOT_EXIST_USER);
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
    const result: UserType[] = await User.aggregate([
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
      throw new Error(ERROR.NOT_EXIST_USER);
    }
    return result;
  }

  async findOneUserDashboard(filter: object) {
    const userDashboard = await User.findOne(filter, 'dashboard _id').lean();
    if (!userDashboard) {
      throw new Error(ERROR.NOT_EXIST_USER);
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

  async updateOneUserConfig(userID: string, userConfig: ObjectType<UserType>) {
    const blockList = AUTH.SETTING_BLOCK_LIST;
    if (!userConfig.username) {
      throw new Error(ERROR.WRONG_BODY_TYPE);
    }
    blockList.forEach((property: string) => {
      if (userConfig[property as keyof UserType]) {
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
    return User.updateOne({ _id: userID }, { dashboard }, { runValidators: true, new: true });
  }

  async updateOneProblemStatistics(userID: string, statistics: object) {
    return User.updateOne({ _id: userID }, { 'dashboard.statistics.problem': statistics });
  }
}

export default new UserService();
