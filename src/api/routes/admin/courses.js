import express from 'express';
import { createCourseAction } from '../../controllers/admin/courses';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.post('/', checkAdmin, createCourseAction);

export default router;
