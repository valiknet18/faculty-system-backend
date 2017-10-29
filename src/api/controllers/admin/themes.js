import {
    getThemesService,
    createThemeService
} from '../../services/admin/themes';

export const getThemesAction = async (req, res, next) => {
    const themes = await getThemesService(req.params);

    res.json({
        themes: themes
    });
};

export const createThemeAction = async (req, res, next) => {
    const attributes = Object.assign({}, req.body, {
        subjectId: req.params.subject
    });

    await createThemeService(attributes);

    res.status(201).json({})
};
