import { Types, Model } from 'mongoose';

import {
  UserType,
  PostType,
  TagType,
  LanguageType,
  EchoRoomType,
  NotifyType,
  CommentType,
} from 'src/types';

class Validate {
  static UserModel: Model<UserType> | undefined;

  static PostModel: Model<PostType> | undefined;

  static LanguageModel: Model<LanguageType> | undefined;

  static TagModel: Model<TagType> | undefined;

  static EchoRoomModel: Model<EchoRoomType> | undefined;

  static NotifyModel: Model<NotifyType> | undefined;

  static CommentModel: Model<CommentType> | undefined;

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

  static userObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.UserModel, value);
  }

  static postObjectID(value: Types.ObjectId): Promise<boolean> {
    console.log(value);
    return Validate.objectIDLogic(Validate.PostModel, value);
  }

  static commentObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.CommentModel, value);
  }

  static languageObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.LanguageModel, value);
  }

  static tagObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.TagModel, value);
  }

  static echoRoomObjectID(value: Types.ObjectId): Promise<boolean> {
    return Validate.objectIDLogic(Validate.EchoRoomModel, value);
  }

  static objectIDLogic(model: Model<any> | undefined, value: Types.ObjectId): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof model === 'undefined') {
        resolve(false);
      }
      model!.exists({ _id: value }).then((isValidate) => resolve(isValidate));
    });
  }
}

export default Validate;
