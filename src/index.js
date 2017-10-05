import http from 'http';
import express from 'express';
import initRoutes from './api/routes';

const app = express();

initRoutes(app);

app.listen(1234);

console.log('Server started on port 1234');
