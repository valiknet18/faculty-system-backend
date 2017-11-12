import express from 'express';
import { getSubjectsListAction, getProfileAction, getEventsAction } from '../controllers/profile';

const router = express.Router();

router.get('/', getProfileAction);
router.get('/events', getEventsAction);
router.get('/subjects', getSubjectsListAction);

export default router;
