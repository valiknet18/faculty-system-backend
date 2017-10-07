import express from 'express';
import { login } from '../controllers/auth';
import { loginChecker } from '../security/auth';

const router = express.Router();

router.post('/login', loginChecker, login);

export default router;
