import express from 'express';
import tasksController from '../controllers/tasks_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/:subject/themes/:theme/tasks', checkAdmin, tasksController.getTasksAction.bind(tasksController));
router.post('/:subject/themes/:theme/tasks', checkAdmin, tasksController.createTaskAction.bind(tasksController));
router.put('/:subject/themes/:theme/tasks/:task', checkAdmin, tasksController.updateTaskAction.bind(tasksController));

export default router;
