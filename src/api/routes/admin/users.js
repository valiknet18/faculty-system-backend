import express from 'express';
import { getStudentsAction, inviteUserAction } from '../../controllers/admin/users';

const router = express.Router();

router.post('/', inviteUserAction);
router.get('/students', getStudentsAction);

export default router;
