import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get('', passport.authenticate('google'), (req: express.Request, res: express.Response) => {
  console.log(req.query);
  console.log(req.body);
  res.redirect('/');
});

export default router;
