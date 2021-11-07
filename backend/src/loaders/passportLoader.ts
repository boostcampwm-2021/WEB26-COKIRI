import * as express from 'express';
import * as passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions as JWTStrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';
import { UserService } from 'src/services';

import { OAuth2Strategy as GoogleStrategy, VerifyFunction } from 'passport-google-oauth';

import { User } from 'src/types';

export default function passportLoader(app: express.Application): void {
  const jwtStrategyOptions: JWTStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const verifyUser = (jwtPayload: User, done: VerifiedCallback) => {
    try {
      const user: User = {
        userID: jwtPayload.userID!,
        username: jwtPayload.username!,
      };
      if (!user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  };
  passport.use(new JWTStrategy(jwtStrategyOptions, verifyUser));

  const authenticateJWT = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    passport.authenticate('jwt', { session: false }, async (error, user) => {
      const result = await UserService.existsUser({
        userID: '61869e920d57714357630428',
        username: 'test username',
      });
      console.log(result);
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  };
  app.use(authenticateJWT);

  const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  };

  const verifyGoogleUser = (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ) => {
    console.log('구글 Oauth2');
    // @TODO: DB 조회
    done(null, profile);
  };

  passport.use(new GoogleStrategy(googleStrategyOptions, verifyGoogleUser));
  app.use(passport.initialize());
}
