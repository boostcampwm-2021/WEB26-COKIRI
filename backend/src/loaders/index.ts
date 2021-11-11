import * as express from 'express';

import expressLoader from 'src/loaders/expressLoader';
import mongooseLoader from 'src/loaders/mongooseLoader';
import passportLoader from 'src/loaders/passportLoader';
import passportJWTLoader from 'src/loaders/passportJWTLoader';
import passportGoogleLoader from 'src/loaders/passportGoogleLoader';
import passportGithubLoader from 'src/loaders/passportGithubLoader';
import routerLoader from 'src/loaders/routerLoader';
import corsLoader from 'src/loaders/corsLoader';

export default function init(app: express.Application) {
  expressLoader(app);
  mongooseLoader();
  passportLoader(app);
  passportJWTLoader();
  passportGoogleLoader();
  passportGithubLoader();
  corsLoader(app);
  routerLoader(app);
}
