import express from 'express';

import groups from './groups';
import courses from './courses';
import subjects from './subjects';
import tasks from './tasks';
import tests from './tests';
import themes from './themes';
import questions from './questions';
import learningSemesters from './learning_semesters';

const router = express.Router();

router.use('/groups', groups);
router.use('/courses', courses);
router.use('/subjects', subjects);
router.use('/subjects', tasks);
router.use('/subjects', tests);
router.use('/subjects', themes);
router.use('/subjects', questions);
router.use('/learning-semesters', learningSemesters);

export default router;
