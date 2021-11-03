import * as express from 'express';
import * as loaders from 'src/loaders';

const app: express.Application = express();

loaders.init(app);

export default app;
