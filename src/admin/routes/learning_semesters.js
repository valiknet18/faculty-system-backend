import express from 'express';
import { checkAdmin } from '../../common/security/common';
import learningSemestersController from '../controllers/learning_semesters_controller';

const router = express.Router();

router.get('/', checkAdmin, learningSemestersController.getLearningSemestersAction.bind(learningSemestersController));
router.post('/', checkAdmin, learningSemestersController.createLearningSemesterAction.bind(learningSemestersController));

export default router;
