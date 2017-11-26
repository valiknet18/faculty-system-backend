import express from 'express';
import coursesController from '../controllers/courses_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/', checkAdmin, coursesController.getCoursesAction.bind(coursesController));
router.post('/', checkAdmin, coursesController.createCourseAction.bind(coursesController));

export default router;
