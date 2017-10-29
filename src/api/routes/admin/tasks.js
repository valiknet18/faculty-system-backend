import express from 'express';
import { createTaskAction, getTasksAction } from '../../controllers/admin/tasks';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/:subject/themes/:theme/tasks', checkAdmin, getTasksAction);
router.post('/:subject/themes/:theme/tasks', checkAdmin, createTaskAction);

export default router;
