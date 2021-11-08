import * as jwt from 'jsonwebtoken';

class JWT {
  static createAccessToken(user: Express.User) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_IN!,
    });
  }

  static createRefreshToken(user: Express.User) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_IN!,
    });
  }
}

export default JWT;
