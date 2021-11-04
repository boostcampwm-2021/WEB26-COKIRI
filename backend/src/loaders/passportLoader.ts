import * as express from 'express';
import * as passport from 'passport';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions as JWTStrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';

import { OAuth2Strategy as GoogleStrategy, VerifyFunction } from 'passport-google-oauth';

import { User } from 'src/types';

export default function passportLoader(app: express.Application): void {
  const jwtStrategyOptions: JWTStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const verifyUser = (jwtPayload: User, done: VerifiedCallback): void => {
    try {
      const user: User | undefined = {
        userID: jwtPayload.userID,
        username: jwtPayload.username,
      };
      if (!user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  };
  passport.use(new JWTStrategy(jwtStrategyOptions, verifyUser));

  const authenticateJWT = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  };
  app.use(authenticateJWT);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // @TODO id => user document
    const user = {};
    done(null, user);
  });

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
    // @TODO: DB 조회
    done(null, profile);
  };

  passport.use(new GoogleStrategy(googleStrategyOptions, verifyGoogleUser));

  app.use(passport.initialize());
}
