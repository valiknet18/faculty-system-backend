import express from 'express';
import { getCourseAction, getTasksAction, getCoursesAction } from '../controllers/courses';
import { updateTaskAction, getTaskAction } from '../controllers/tasks';

const router = express.Router();

router.get('/', getCoursesAction);

router.get('/:course', getCourseAction);
router.get('/:course/tasks', getTasksAction);

router.get('/:course/tasks/:task', getTaskAction);
router.put('/:course/tasks/:task', updateTaskAction);

export default router;
