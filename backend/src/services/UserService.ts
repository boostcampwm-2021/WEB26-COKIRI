import { nanoid } from 'nanoid';

import { User, Post } from 'src/models';
import { User as UserType, UserAuthProvider, ObjectType } from 'src/types';
import { UserType as UserSchemaType } from 'src/types/modelType';
import { Enums, ObjectID } from 'src/utils';

class UserService {
  async existsUser(user: UserType): Promise<boolean> {
    return User.exists({ _id: user.userID });
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

  async findOneUserForID(user: UserType) {
    const result: any[] = await User.aggregate([
      {
        $project: {
          _id: { $toString: '$_id' },
          followCount: { $size: '$followers' },
          username: '$username',
          isRegistered: '$isRegistered',
          name: '$name',
          profileImage: '$profileImage',
        },
      },
      { $match: { _id: user.userID } },
    ]);
    if (result.length === 0) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result[0];
  }

  async findOneUserProfileForUsername(username: string) {
    const result: any[] = await User.aggregate([
      {
        $project: {
          followerCount: { $size: '$followers' },
          followCount: { $size: '$follows' },
          _id: { $toString: '$_id' },
          username: '$username',
          bio: '$bio',
        },
      },
      { $match: { username } },
    ]);
    if (result.length === 0) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result[0];
  }

  async findOneUserPostsForID(userID: string) {
    return Post.find({ userID });
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
    });
  }

  async findOneFollows(userID: string) {
    const result = await User.findOne({ _id: userID })
      .select({ follows: true })
      .populate({ path: 'follows', select: ['username', 'profileImage'] });
    if (!result) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result.follows!;
  }

  async findOneFollowers(userID: string) {
    const result = await User.findOne({ _id: userID })
      .select({ follows: true })
      .populate({ path: 'followers', select: ['username', 'profileImage'] });
    if (!result) {
      throw new Error(Enums.error.NO_USERS);
    }
    return result.followers!;
  }

  async findRandomUserSuggestions(userID: string) {
    const result: any[] = await User.aggregate([
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

  async updateOneUserConfig(user: UserType, userConfig: ObjectType<UserSchemaType>) {
    const blockList = ['followers', 'follows', 'posts', 'likes', 'notifies', 'dashboard'];
    if (!userConfig.username) {
      throw new Error(Enums.error.WRONG_BODY_TYPE);
    }
    blockList.forEach((property: string) => {
      if (userConfig[property as keyof UserSchemaType]) {
        throw new Error(Enums.error.WRONG_BODY_TYPE);
      }
    });
    await User.updateOne(
      { _id: user.userID },
      { ...userConfig, isRegistered: true },
      { runValidators: true, upsert: true },
    );
  }

  async addToSetFollows(user: UserType, followID: string) {
    await User.updateOne(
      { _id: user.userID },
      { $addToSet: { follows: followID } },
      { runValidators: true },
    );
    await User.updateOne(
      { _id: followID },
      { $push: { followers: user.userID } },
      { runValidators: true },
    );
  }

  async pullFollows(user: UserType, followID: string) {
    await User.updateOne(
      { _id: user.userID },
      { $pull: { follows: followID } },
      { runValidators: true },
    );
    await User.updateOne(
      { _id: followID },
      { $pull: { followers: user.userID } },
      { runValidators: true },
    );
  }
}

export default new UserService();
