import * as express from 'express';
import expressLoader from 'src/loaders/expressLoader';
import mongooseLoader from 'src/loaders/mongooseLoader';
import passportLoader from 'src/loaders/passportLoader';
import routerLoader from 'src/loaders/routerLoader';

export default function init(app: express.Application) {
  expressLoader(app);
  mongooseLoader();
  passportLoader(app);
  routerLoader(app);
}
