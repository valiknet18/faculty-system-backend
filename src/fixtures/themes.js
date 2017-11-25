import { createThemeService } from "../api/services/admin/themes";

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
        await createThemeService(theme);
    }
};

export default fixtures;
