import * as express from 'express';
import * as passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { User } from 'src/types';

export default function passportLoader(app: express.Application): void {
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
  passport.use(new JWTStrategy(jwtOptions, verifyUser));
  passport.initialize();

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
}
