import './config/index';
import http from 'http';
import express from 'express';
import router from './api/routes';
import jwt from './config/jwt';

const app = express();

app.use(jwt);
app.use('/api', router);

app.listen(1234);

console.log('Server started on port 1234');
