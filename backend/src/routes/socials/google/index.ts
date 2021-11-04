import * as express from 'express';
import callbackRouter from './callback';
import getRouter from './get';

const router = express.Router();

router.use(getRouter);
router.use('/callback', callbackRouter);

export default router;
