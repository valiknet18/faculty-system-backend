import db from '../../../config/db';

export const getThemesService = async (subject) => {
    const query = `
        SELECT * FROM themes WHERE subject_id = $1
    `;

    const result = await db.query(query, [
        subject.subject
    ]);

    return result.rows;
};

export const createThemeService = async (attributes) => {
    const query = `
        INSERT INTO themes(title, subject_id, created_at, updated_at) VALUES($1, $2, NOW(), NOW())
    `;

    await db.query(query, [
        attributes.title,
        attributes.subjectId
    ]);
};
