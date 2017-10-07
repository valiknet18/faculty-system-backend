import db from '../../config/db';
import Subject from "../models/subject";

export const createSubjectService = async (parameters) => {
    const query = `
        INSERT INTO subjects(name) VALUES($1) RETURNING id, name
    `;

    const result = await db.query(query, [parameters['name']]);

    if (!result.rows.length) {
        return false;
    }

    const subject = Subject.fromArray(result.rows[0]);

    return subject;
};

export const getSubjectsService = async () => {
    const query = `
        SELECT * FROM subjects
    `;

    const result = await db.query(query);

    return result.rows;
};
