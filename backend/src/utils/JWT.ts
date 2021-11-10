import * as jwt from 'jsonwebtoken';

class JWT {
  createAccessToken(user: Express.User) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_IN!,
    });
  }

  createRefreshToken(user: Express.User) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_IN!,
    });
  }
}

export default new JWT();
