import express from 'express';
import tasksRepository from '../controllers/tasks_controller';

const router = express.Router();

router.get('/:course/tasks', tasksRepository.getTasksAction.bind(tasksRepository));
router.get('/:course/tasks/:task', tasksRepository.getTaskAction.bind(tasksRepository));
router.put('/:course/tasks/:task/move', tasksRepository.moveTaskAction.bind(tasksRepository));

export default router;
