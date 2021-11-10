import { Types, Model } from 'mongoose';

class Validate {
  stringDigit(min: number, max: number) {
    return function validateDigit(str: string): boolean {
      const regx = new RegExp(`^.{${min},${max}}$`);
      return regx.test(str);
    };
  }

  numberDigit(min: number, max: number) {
    return function validateDigit(number: number): boolean {
      const regx = new RegExp(`^[0-9]{${min},${max}}$`);
      return regx.test(number.toString());
    };
  }

  url(url: string): boolean {
    const regx = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regx.test(url);
  }

  email(email: string): boolean {
    const regx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    return regx.test(email);
  }

  referenceObjectID(model: Model<any>) {
    return function validator(value: Types.ObjectId | Types.ObjectId[]) {
      return new Promise((resolve) => {
        if (Array.isArray(value)) {
          Promise.all(value.map((id) => model.exists({ _id: id }))).then(
            (isExistsArray: boolean[]) => {
              resolve(isExistsArray.reduce((prev, curr) => prev && curr, true));
            },
          );
        } else {
          model.exists({ _id: value }).then((isValidate) => resolve(isValidate));
        }
      });
    };
  }
}

export default new Validate();
