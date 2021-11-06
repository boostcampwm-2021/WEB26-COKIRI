import * as express from 'express';
import * as dotenv from 'dotenv';
import loadersInit from 'src/loaders';

dotenv.config();

const app: express.Application = express();

loadersInit(app);

export default app;
