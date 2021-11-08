import * as express from 'express';
import * as passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions as JWTStrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';
import { OAuth2Strategy as GoogleStrategy, VerifyFunction } from 'passport-google-oauth';

import { UserService } from 'src/services';
import { User } from 'src/types';

export default function passportLoader(app: express.Application): void {
  const jwtStrategyOptions: JWTStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
  };

  const verifyUser = async (jwtPayload: any, done: VerifiedCallback) => {
    try {
      const user: User = { userID: jwtPayload.userID! };
      if (!user || !(await UserService.existsRegisteredUser(user))) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };

  const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  };

  const verifyGoogleUser = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ) => {
    const user = await UserService.findOrCreateUserForProvider({
      authProvider: 'google',
      authProviderID: profile.id,
    });
    done(null, user);
  };

  passport.use('jwt', new JWTStrategy(jwtStrategyOptions, verifyUser));
  passport.use('google', new GoogleStrategy(googleStrategyOptions, verifyGoogleUser));
  app.use(passport.initialize());
}
