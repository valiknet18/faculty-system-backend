import express from 'express';
import testsController from '../controllers/tests_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/:subject/tests', checkAdmin, testsController.getTestsAction.bind(testsController));
router.post('/:subject/tests', checkAdmin, testsController.createTestAction.bind(testsController));
router.put('/:subject/tests/:test', checkAdmin, testsController.updateTestAction.bind(testsController));

export default router;
