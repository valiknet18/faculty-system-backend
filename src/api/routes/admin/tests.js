import express from 'express';
import { checkAdmin } from '../../security/common';
import { createTestAction, getTestsAction } from '../../controllers/admin/tests';

const router = express.Router();

router.get('/:subject/tests', checkAdmin, getTestsAction);
router.post('/:subject/tests', checkAdmin, createTestAction);

export default router;
