import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign(
    {
      userId: req.user?.id,
      username: req.user?.username,
    },
    process.env.JWT_SECRET!,
  );
  console.log(token);
  res.redirect('/');
});

export default router;
