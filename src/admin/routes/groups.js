import express from 'express';
import groupsController from '../controllers/groups_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/', checkAdmin, groupsController.getGroupsAction.bind(groupsController));
router.post('/', checkAdmin, groupsController.createGroupAction.bind(groupsController));
router.get('/:group', checkAdmin, groupsController.getGroupAction.bind(groupsController));
router.put('/:group', checkAdmin, groupsController.updateGroupAction.bind(groupsController));

export default router;
