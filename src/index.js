import './config/index';
import http from 'http';
import express from 'express';
import router from './api/routes';
import jwt from './config/jwt';
import { handleAuthErrors } from './api/middlewares/errors';

const app = express();

app.use(express.json()); 
app.use(jwt);
app.use('/api', router);
app.use(handleAuthErrors);

app.listen(1234);

console.log('Server started on port 1234');
