import express from 'express';
import { createSubjectAction, getSubjectsAction } from '../controllers/subjects';
import { checkAdmin } from '../security/common';

const router = express.Router();

router.get('/', checkAdmin, getSubjectsAction);
router.post('/', checkAdmin, createSubjectAction);

export default router;
