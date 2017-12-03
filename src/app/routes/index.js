import express from 'express';
import auth from './auth';
import courses from './courses';
import tasks from './tasks';
import profile from './profile';

const router = express.Router();

// router.use('/users', users);

router.use('/profile', profile);
router.use('/auth', auth);
router.use('/courses', courses);
router.use('/courses', tasks);

export default router;
