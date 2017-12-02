import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Task from "../../common/models/task";
import Theme from "../../common/models/theme";

class ThemesRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get themes
     * @param subject
     * @return {Promise.<Array>}
     */
    async getThemes(subject) {
        const query = `
            SELECT * FROM themes WHERE subject_id = $1
        `;

        const result = await db.query(query, [
            subject
        ]);

        return Collection.convert(Theme, result.rows);
    }

    /**
     * Create theme
     * @param {Theme} theme
     * @return {Promise.<Theme>}
     */
    async createTheme(theme) {
        const query = `
            INSERT INTO themes(title, subject_id, created_at, updated_at) 
            VALUES($1, $2, NOW(), NOW())
            RETURNING id
        `;

        const result = await db.query(query, [
            theme.title,
            theme.subject.id
        ]);

        theme.setId(result.rows[0].id);

        return theme;
    }

    /**
     * Update theme
     * @param {Theme} theme
     * @return {Promise.<Theme>}
     */
    async updateTheme(theme) {
        const query = `
            UPDATE themes SET title=$1 WHERE id=$2
        `;

        await db.query(query, [
            theme.title,
            theme.id
        ]);

        return theme;
    }
}

export default new ThemesRepository();
