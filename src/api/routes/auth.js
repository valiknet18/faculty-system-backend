import express from 'express';
import { loginAction } from '../controllers/auth';
import { loginChecker } from '../security/auth';

const router = express.Router();

router.post('/login', loginChecker, loginAction);

export default router;
