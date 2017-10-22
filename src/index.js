import './config/index';
import express from 'express';
import router from './api/routes';
import jwt from './config/jwt';
import cors from 'cors';

import { authMiddleware } from './api/middlewares/auth';
import { handleAuthErrors } from './api/middlewares/errors';

const app = express();

app.use(express.json()); 
app.use(jwt);

app.use(authMiddleware);
app.use(handleAuthErrors);

app.use(cors());

app.use('/api', router);

process.on('unhandledRejection', (err) => {
    console.log(err.stack);
});


app.listen(8080);

console.log('Server started on port 8080');
