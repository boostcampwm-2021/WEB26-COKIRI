import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { User } from 'src/types';

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = (jwtPayload: User, done: Function): void => {
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

passport.use(new JwtStrategy(jwtOptions, verifyUser));
passport.initialize();
