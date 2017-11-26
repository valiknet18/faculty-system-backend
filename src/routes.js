import express from 'express';

import app from './app/routes';
import admin from './admin/routes';

const router = express.Router();

router.use('/', app);
router.use('/admin', admin);

export default router;
