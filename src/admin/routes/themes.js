import express from 'express';
import themesController from '../controllers/themes_controller';
import { checkAdmin } from '../../common/security/common';

const router = express.Router();

router.get('/:subject/themes', checkAdmin, themesController.getThemesAction.bind(themesController));
router.post('/:subject/themes', checkAdmin, themesController.createThemeAction.bind(themesController));

export default router;
