import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  console.log(req.user);
  res.redirect('/');
});

export default router;
