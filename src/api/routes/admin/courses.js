import express from 'express';
import {createCourseAction, getCoursesAction} from '../../controllers/admin/courses';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/', checkAdmin, getCoursesAction);
router.post('/', checkAdmin, createCourseAction);

export default router;
