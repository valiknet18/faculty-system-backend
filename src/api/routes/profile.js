import express from 'express';
import { getSubjectsListAction } from '../controllers/profile';

const router = express.Router();

router.get('/subjects', getSubjectsListAction);

export default router;
