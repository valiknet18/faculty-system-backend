import db from '../../../config/db';

export const createLearningSemesterService = async (parameters) => {
    const query = `
        INSERT INTO learning_semesters(from_date, to_date) VALUES ($1, $2)
    `;

    const result = await db.query(query, [
        parameters['from_date'],
        parameters['to_date']
    ]);
};
