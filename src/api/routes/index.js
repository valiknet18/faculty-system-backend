import express from 'express';
import users from './users';
import auth from './auth';
import profile from './profile';

const router = express.Router();

router.use('/profile/self', profile);
router.use('/auth', auth);
router.use('/users', users);

export default router;
