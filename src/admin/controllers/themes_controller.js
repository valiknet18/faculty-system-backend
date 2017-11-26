import themesService from '../services/themes_service';

class ThemesController {
    constructor(themesService) {
        this._themesService = themesService;
    }

    /**
     * Get themes
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getThemesAction(req, res) {
        const themes = await this._themesService.getThemes(req.params.subject);

        res.json({
            themes: themes
        });
    }

    /**
     * Create theme
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createThemeAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            subject: req.params.subject,
        });

        const theme = this._themesService.createTheme(attributes);

        res.status(201).json({})
    }
}

export default new ThemesController(themesService);
