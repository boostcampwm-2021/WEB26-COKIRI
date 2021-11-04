import * as express from 'express';
import getRouter from './get';

const router = express.Router();

router.use(getRouter);

export default router;
