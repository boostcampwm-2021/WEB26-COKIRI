import * as express from 'express';
import expressLoader from 'src/loaders/expressLoader';

export function init(app: express.Application) {
  expressLoader(app);
}
