import { Types, Model } from 'mongoose';

import {
  UserType,
  PostType,
  TagType,
  TechStackType,
  EchoRoomType,
  NotifyType,
  CommentType,
  PostLikeType,
  ImageType,
  FollowType,
  EchoMessageType,
  DashboardRepositoryType,
  DashboardHistoryType,
  CommentLikeType,
} from 'src/types';

class Validate {
  static UserModel: Model<UserType> | undefined;

  static PostModel: Model<PostType> | undefined;

  static TechStackModel: Model<TechStackType> | undefined;

  static TagModel: Model<TagType> | undefined;

  static EchoRoomModel: Model<EchoRoomType> | undefined;

  static NotifyModel: Model<NotifyType> | undefined;

  static CommentModel: Model<CommentType> | undefined;

  static PostLikeModel: Model<PostLikeType> | undefined;

  static ImageModel: Model<ImageType> | undefined;

  static FollowModel: Model<FollowType> | undefined;

  static EchoMessageModel: Model<EchoMessageType> | undefined;

  static DashboardRepositoryModel: Model<DashboardRepositoryType> | undefined;

  static DashboardHistoryModel: Model<DashboardHistoryType> | undefined;

  static CommentLikeModel: Model<CommentLikeType> | undefined;

  static urlSafeStringDigit(min: number, max: number) {
    return function validateDigit(str: string): boolean {
      const regx = new RegExp(`^[a-zA-Z0-9_-]{${min},${max}}$`);
      return regx.test(str);
    };
  }

  static numberDigit(min: number, max: number) {
    return function validateDigit(number: number): boolean {
      const regx = new RegExp(`^[0-9]{${min},${max}}$`);
      return regx.test(number.toString());
    };
  }

  static url(url: string): boolean {
    if (url === '/images/default_profile_image.jpg') return true;
    const regx = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regx.test(url);
  }

  static email(email: string): boolean {
    const regx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    return regx.test(email);
  }

  static async dashboardTechStacksID(value: object): Promise<boolean> {
    const techStacksID = Object.values(value).reduce((prev, curr) => {
      const stacksID = curr.map((stack: TechStackType) => stack._id);
      const mergeStacksID = prev.concat(stacksID);
      return mergeStacksID.filter(
        (id: Types.ObjectId, index: number) => mergeStacksID.indexOf(id) === index,
      );
    }, []);
    const count = await Validate.TechStackModel?.countDocuments({ _id: { $in: techStacksID } });
    return count === techStacksID.length;
  }

  static userObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.UserModel, value);
  }

  static postObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.PostModel, value);
  }

  static commentObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.CommentModel, value);
  }

  static techStackObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.TechStackModel, value);
  }

  static tagObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.TagModel, value);
  }

  static echoRoomObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.EchoRoomModel, value);
  }

  static objectIDLogic(model: Model<any> | undefined, value: Types.ObjectId): Promise<boolean> {
    return new Promise((resolve) => {
      if (model === undefined) {
        resolve(false);
      }
      model!.exists({ _id: value }).then((isValidate) => resolve(isValidate));
    });
  }
}

export default Validate;
