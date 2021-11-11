import * as express from 'express';
import * as cors from 'cors';

export default function corsLoader(app: express.Application): void {
  const whitelist = [`${process.env.CLIENT_URL}`];
  const corsOptions = {
    origin: whitelist,
  };
  app.use(cors(corsOptions));
}
