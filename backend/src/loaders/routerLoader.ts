import * as express from 'express';
import router from 'src/routers';

export default function routerLoader(app: express.Application): void {
  app.use(router);
}
