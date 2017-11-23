import express from 'express';
import path from 'path';

import './config/index';
import router from './api/routes';
import cors from 'cors';
import jwt from './config/jwt';

import { authMiddleware } from './api/middlewares/auth';
import { handleAuthErrors } from './api/middlewares/errors';

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

app.listen(8080);

export default app;

console.log('Server started on port 8080');
