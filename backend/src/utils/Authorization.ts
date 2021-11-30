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

  getDecodeOauthState(state: string) {
    if (!state) return {};
    return JSON.parse(Buffer.from(state, 'base64').toString());
  }

  createEncodeOauthState(data: object) {
    return Buffer.from(JSON.stringify({ hash: process.env.OAUTH2_STATE, ...data })).toString(
      'base64',
    );
  }

  compareOauthState({ hash }: { hash: string }) {
    return hash === process.env.OAUTH2_STATE;
  }

  createAccessJWT(user: Express.User) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_IN!,
    });
  }

  createTestJWT(id: string) {
    return jwt.sign({ userID: id }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.TEST_EXPIRE_IN!,
    });
  }

  createRefreshJWT(user: Express.User) {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_IN!,
    });
  }
}

export default new Authorization();
