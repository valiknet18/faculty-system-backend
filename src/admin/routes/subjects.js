import express from 'express';
import subjectsController from '../controllers/subjects_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/', checkAdmin, subjectsController.getSubjectsAction.bind(subjectsController));
router.post('/', checkAdmin, subjectsController.createSubjectAction.bind(subjectsController));
router.put('/:subject', checkAdmin, subjectsController.updateSubjectAction.bind(subjectsController));

export default router;
