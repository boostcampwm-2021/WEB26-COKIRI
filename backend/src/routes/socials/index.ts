import * as express from 'express';
import googleRouter from './google';

const router = express.Router();

router.use('/google', googleRouter);

export default router;
