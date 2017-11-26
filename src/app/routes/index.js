import express from 'express';
import auth from './auth';
import courses from './courses';
import tasks from './tasks';

const router = express.Router();

// router.use('/profile/self', profile);
// router.use('/users', users);

router.use('/auth', auth);
router.use('/courses', courses);
router.use('/courses', tasks);

export default router;
