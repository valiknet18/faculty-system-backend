import express from 'express';
import users from './users';
import auth from './auth';
import profile from './profile';
import subjects from './subjects';

const router = express.Router();

router.use('/profile/self', profile);
router.use('/auth', auth);
router.use('/users', users);
router.use('/subjects', subjects);

export default router;
