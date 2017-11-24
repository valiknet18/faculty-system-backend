import express from 'express';
import users from './users';
import auth from './auth';
import profile from './profile';
import admin from './admin';
import courses from './courses';

const router = express.Router();

router.use('/profile/self', profile);
router.use('/auth', auth);
router.use('/users', users);
router.use('/courses', courses);
router.use('/admin', admin);

export default router;
