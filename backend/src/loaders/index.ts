import * as express from 'express';

import expressLoader from 'src/loaders/expressLoader';
import mongooseLoader from 'src/loaders/mongooseLoader';
import passportLoader from 'src/loaders/passportLoader';
import gitPassportLoaders from 'src/loaders/gitPassportLoaders';
import routerLoader from 'src/loaders/routerLoader';
import corsLoader from 'src/loaders/corsLoader';

export default function init(app: express.Application) {
  expressLoader(app);
  mongooseLoader();
  passportLoader(app);
  gitPassportLoaders(app);
  corsLoader(app);
  routerLoader(app);
}
