import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

const app: express.Application = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
