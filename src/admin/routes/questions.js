import express from 'express';
import questionsController from '../controllers/questions_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/:subject/tests/:test/questions', checkAdmin, questionsController.getQuestionsAction.bind(questionsController));
router.post('/:subject/tests/:test/questions', checkAdmin, questionsController.createQuestionAction.bind(questionsController));

export default router;
