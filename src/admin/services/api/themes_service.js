import themesRepository from '../../repositories/themes_repository';
import Theme from "../../../common/models/theme";

class ThemesService {
    /**
     * @param {ThemesRepository} themesRepository
     */
    constructor(themesRepository) {
        this._themesRepository = themesRepository;
    }

    /**
     * Create theme
     * @param {Object} attributes
     * @return {Promise.<Theme>}
     */
    async createTheme(attributes) {
        return await this._themesRepository.createTheme(
            Theme.fromArray(attributes)
        );
    }

    /**
     * Update theme
     * @param {Object} attributes
     * @return {Promise.<Theme>}
     */
    async updateTheme(attributes) {
        return await this._themesRepository.updateTheme(
            Theme.fromArray(attributes)
        );
    }

    /**
     * Get themes
     * @param subject
     * @return {Promise.<Array>}
     */
    async getThemes(subject) {
        return await this._themesRepository.getThemes(subject);
    }
}

export default new ThemesService(themesRepository);
