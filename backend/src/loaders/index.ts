import * as express from 'express';
import expressLoader from 'src/loaders/expressLoader';
import mongooseLoader from 'src/loaders/mongooseLoader';

export default function init(app: express.Application) {
  expressLoader(app);
  mongooseLoader();
}
