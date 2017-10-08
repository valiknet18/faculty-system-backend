import express from 'express';
import { createSubjectAction, getSubjectsAction, updateSubjectAction } from '../../controllers/admin/subjects';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/', checkAdmin, getSubjectsAction);
router.post('/', checkAdmin, createSubjectAction);
router.put('/:subject', checkAdmin, updateSubjectAction);

export default router;
