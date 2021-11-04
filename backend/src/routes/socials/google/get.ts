import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }),
);

export default router;
