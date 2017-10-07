import express from 'express';
import { getUsersAction } from '../controllers/users';

const router = express.Router();

router.get('/', getUsersAction);

export default router;
