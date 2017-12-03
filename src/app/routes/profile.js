import express from 'express';
import profileController from '../controllers/profile_controller';

const router = express.Router();

router.get('/self', profileController.getProfileAction.bind(profileController));

export default router;
