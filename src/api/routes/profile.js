import express from 'express';
import { getSubjectsListAction, getProfileAction } from '../controllers/profile';

const router = express.Router();

router.get('/', getProfileAction);
router.get('/subjects', getSubjectsListAction);

export default router;
