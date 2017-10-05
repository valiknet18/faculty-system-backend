import express from 'express';
import users from './users';

const router = express.Router();

router.use('/users', users);

const mergeRoutes = (app) => {
    app.use('/api', router);
}; 

export default mergeRoutes;
