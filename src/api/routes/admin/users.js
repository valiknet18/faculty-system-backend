import express from 'express';
import {
    getUsersAction,
    inviteUserAction,
    editUserAction,
    getUserAction
} from '../../controllers/admin/users';

const router = express.Router();

router.get('/', getUsersAction);
router.post('/', inviteUserAction);
router.get('/:user', getUserAction);
router.put('/:user', editUserAction);

export default router;
