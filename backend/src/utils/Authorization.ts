import * as jwt from 'jsonwebtoken';

class Authorization {
  clearCookieOptions = {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.MODE !== 'development',
    domain: process.env.MAIN_DOMAIN,
  };

  cookieOptions = {
    maxAge: Number(process.env.JWT_ACCESS_EXPIRE_IN!),
    httpOnly: true,
    secure: process.env.MODE !== 'development',
    domain: process.env.MAIN_DOMAIN,
  };

  createAccessJWT(user: Express.User) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_IN!,
    });
  }

  createRefreshJWT(user: Express.User) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_IN!,
    });
  }
}

export default new Authorization();
