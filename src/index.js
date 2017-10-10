import express from 'express';
import path from 'path';

import './config/index';
import router from './api/routes';
import jwt from './config/jwt';
import db from '../src/config/db';

import { authMiddleware } from './api/middlewares/auth';
import { handleAuthErrors } from './api/middlewares/errors';

const app = express();

app.use(express.json()); 
app.use(jwt);

app.use(authMiddleware);
app.use(handleAuthErrors);

app.use('/api', router);
app.use('/doc', express.static(path.join(__dirname, '../public/doc')));

process.on('unhandledRejection', (err) => {
    console.log(err.stack);
});

//todo find a pretty way
//check connect from db
db.query(`SELECT * FROM users`)
    .catch((err) => console.log(`db error code: ${err.code}`))
    .then(() => console.log('db connect'));

app.listen(1234);

console.log('Server started on port 1234');
