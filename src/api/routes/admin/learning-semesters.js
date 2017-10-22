import express from 'express';
import {
    createLearningSemesterAction
} from '../../controllers/admin/learning-semesters';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/', checkAdmin, createLearningSemesterAction);


export default router;
