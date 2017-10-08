import express from 'express';
import { getStudentsAction } from '../../controllers/users';

const router = express.Router();

router.get('/students', getStudentsAction);

export default router;
