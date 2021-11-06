import * as express from 'express';
import usersRouter from './users';
import postsRouter from './posts';

const router = express.Router();
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router;
