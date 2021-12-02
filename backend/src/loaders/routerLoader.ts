import * as express from 'express';
import { useExpressServer } from 'routing-controllers';

export default function routerLoader(app: express.Application): void {
  useExpressServer(app, {
    routePrefix: '/v1',
    controllers: ['src/routers/v1/**/*.ts'],
  });
}
