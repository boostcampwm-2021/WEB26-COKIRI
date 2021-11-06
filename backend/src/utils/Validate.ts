class Validate {
  static stringDigit(min: number, max: number): Function {
    return function (str: string): boolean {
      const regx = new RegExp(`^*{${min},${max}$`);
      return regx.test(str);
    };
  }

  static numberDigit(min: number, max: number): Function {
    return function (number: number): boolean {
      const regx = new RegExp(`^[0-9]{${min},${max}$`);
      return regx.test(number.toString());
    };
  }

  static url(url: string): boolean {
    const regx = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regx.test(url);
  }

  static email(email: string): boolean {
    const regx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    return regx.test(email);
  }
}

export default Validate;
