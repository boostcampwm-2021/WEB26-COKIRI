import * as express from 'express';
import postsRouter from './posts';
import usersRouter from './users';
import socialsRouter from './socials';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/socials', socialsRouter);

export default router;
