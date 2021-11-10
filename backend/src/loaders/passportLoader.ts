import * as express from 'express';
import * as passport from 'passport';

export default function passportLoader(app: express.Application): void {
  app.use(passport.initialize());
}
