import express from 'express';
import path from 'path';

import './config/index';

import router from './routes';
import cors from 'cors';
import jwt from './config/jwt';

import { authMiddleware } from './common/middlewares/auth';
import { handleAuthErrors } from './common/middlewares/errors';

const app = express();

app.use(express.json());
app.use(jwt);

app.use(authMiddleware);
app.use(handleAuthErrors);

app.use(cors());
app.use('/api', router);

app.use('/doc', express.static(path.join(__dirname, '../public/doc')));

process.on('unhandledRejection', (err) => {
    console.log(err.stack);
});

export default app;
