import { getTeachersAction } from '../../controllers/admin/users';
import * as express from "express";

const router = express.Router();

router.get('/', getTeachersAction);

export default router;
