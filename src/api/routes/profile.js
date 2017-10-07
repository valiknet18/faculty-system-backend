import express from 'express';
import { getSubjectsList } from '../controllers/profile';

const router = express.Router();

router.get('/subjects', getSubjectsList);

export default router;
