import express from 'express';
import subjects from './subjects';
import groups from './groups';
import users from './users';
import courses from './courses';
import themes from './themes';
import tasks from './tasks';
import tests from './tests';
import questions from './questions';
import teachers from './teachers';
import learningSemesters from './learning-semesters';

const router = express.Router();

router.use('/subjects', subjects);
router.use('/subjects', themes);
router.use('/subjects', tasks);
router.use('/subjects', tests);
router.use('/subjects', questions);
router.use('/groups', groups);
router.use('/users', users);
router.use('/teachers', teachers);
router.use('/courses', courses);
router.use('/learning-semesters', learningSemesters);

export default router;
