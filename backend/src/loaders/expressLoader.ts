import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

export default (app: express.Application): void => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
