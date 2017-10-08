import express from 'express';
import {
    getGroupsAction,
    createGroupAction,
    updateGroupAction,
    getGroupAction
} from '../../controllers/admin/groups';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/', checkAdmin, getGroupsAction);
router.post('/', checkAdmin, createGroupAction);
router.get('/:group', checkAdmin, getGroupAction);
router.put('/:group', checkAdmin, updateGroupAction);

export default router;
