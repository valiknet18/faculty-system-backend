import express from 'express';
import subjects from './subjects';
import groups from './groups';
import users from './users';
import courses from './courses';

const router = express.Router();

router.use('/subjects', subjects);
router.use('/groups', groups);
router.use('/users', users);
router.use('/courses', courses);

export default router;
