import express from 'express';
import { checkAdmin } from '../../security/common';
import { getQuestionsAction, createQuestionAction } from '../../controllers/admin/questions';

const router = express.Router();

router.get('/:subject/tests/:test/questions', checkAdmin, getQuestionsAction);
router.post('/:subject/tests/:test/questions', checkAdmin, createQuestionAction);

export default router;
