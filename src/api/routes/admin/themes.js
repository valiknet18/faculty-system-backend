import express from 'express';
import { createThemeAction, getThemesAction } from '../../controllers/admin/themes';
import { checkAdmin } from '../../security/common';

const router = express.Router();

router.get('/:subject/themes', checkAdmin, getThemesAction);
router.post('/:subject/themes', checkAdmin, createThemeAction);

export default router;
