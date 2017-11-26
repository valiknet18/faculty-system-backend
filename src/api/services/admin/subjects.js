import db from '../../../common/connection/db';
import Subject from "../../models/subject";

export const getSubjectsService = async () => {
    const query = `
        SELECT * FROM subjects
    `;

    const result = await db.query(query);

    if (!result.rows.length) {
        return [];
    }

    let res = [];

    for (let subjectAttributes of result.rows) {
        res.push(Subject.fromArray(subjectAttributes))
    }

    return res;
};

export const getSubjectService = async (attributes) => {
    const query = `
        SELECT * FROM subjects WHERE id=$1
    `;

    const result = await db.query(query, [attributes['subject']]);

    if (!result.rows.length) {
        return null;
    }

    return Subject.fromArray(attributes);
};

export const createSubjectService = async (attributes) => {
    const query = `
        INSERT INTO subjects(name) VALUES($1) RETURNING id, name
    `;

    const result = await db.query(query, [
        attributes.name
    ]);

    if (!result.rows.length) {
        return false;
    }

    return Subject.fromArray(result.rows[0]);
};

export const updateSubjectService = async (attributes) => {
    const query = `
        UPDATE subjects SET name=$1 WHERE id=$2 RETURNING id, name
    `;

    const result = await db.query(query, [
        attributes['name'],
        attributes['subject']
    ]);

    if (!result.rows.length) {
        return null;
    }

    return Subject.fromArray(result.rows[0]);
};

export const removeTeachersFromSubject = async (attributes) => {
    const query = `
        DELETE FROM teacher_subject WHERE subject_id=$1
    `;

    const result = await db.query(query, [
       attributes['subject']
    ]);
};

export const addTeachersToSubject = async (attributes) => {
    const query = `
        INSERT INTO teacher_subject(teacher_id, subject_id) VALUES($1, $2)
    `;

    for (let teacherId of attributes['teachers']) {
        const result = await db.query(query, [
            teacherId,
            attributes['subject']
        ]);
    }
};
