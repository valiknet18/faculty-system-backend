import themesService from "../../src/admin/services/themes_service";

const themes = [
    {
        title: 'Title 1',
        subject: 1,
    },
    {
        title: 'Title 2',
        subject: 1,
    }
];

const fixtures = async () => {
    for (let theme of themes) {
        await themesService.createTheme(theme);
    }
};

export default fixtures;
