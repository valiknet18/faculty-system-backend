import express from 'express';
import usersController from '../controllers/users_controller';

const router = express.Router();

router.get('/', usersController.getUsersAction.bind(usersController));
router.post('/', usersController.inviteUserAction.bind(usersController));
router.get('/:user', usersController.getUserAction.bind(usersController));
router.put('/:user', usersController.editUserAction.bind(usersController));

export default router;
