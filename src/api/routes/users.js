import exporess from 'express';
import { getUsers } from '../controllers/users';

const router = exporess.Router();

router.get('/', getUsers);

export default router;
