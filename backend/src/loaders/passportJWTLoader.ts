import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions as JWTStrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';
import * as passport from 'passport';

import { User } from 'src/types';
import { UserService } from 'src/services';

export default function passportJWTLoader(): void {
  const jwtStrategyOptions: JWTStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
  };

  const verifyRegisteredUser = async (jwtPayload: User, done: VerifiedCallback) => {
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

  const verifyUser = async (jwtPayload: User, done: VerifiedCallback) => {
    try {
      const user: User = { userID: jwtPayload.userID! };
      if (!user || !(await UserService.existsUser(user))) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };

  passport.use('jwt-registered', new JWTStrategy(jwtStrategyOptions, verifyRegisteredUser));
  passport.use('jwt', new JWTStrategy(jwtStrategyOptions, verifyUser));
}
