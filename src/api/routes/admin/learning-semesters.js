import express from 'express';
import {
    createLearningSemesterAction,
    getLearningSemestersAction
} from '../../controllers/admin/learning-semesters';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/', checkAdmin, getLearningSemestersAction);
router.post('/', checkAdmin, createLearningSemesterAction);


export default router;
