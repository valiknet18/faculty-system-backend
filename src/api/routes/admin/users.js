import express from 'express';
import { getUsersAction, inviteUserAction } from '../../controllers/admin/users';

const router = express.Router();

router.post('/', inviteUserAction);
router.get('/', getUsersAction);

export default router;
