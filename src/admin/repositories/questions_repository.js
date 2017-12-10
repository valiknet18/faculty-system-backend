import db from '../../common/connection/db';
import Collection from "../../common/utils/collection";
import Question from "../../common/models/question";

class QuestionsRepository {
    constructor(db) {
        this._db = db;
    }

    /**
     * Get questions
     * @param test
     * @return {Promise.<Array>}
     */
    async getQuestions(test) {
        const query = `
            SELECT * FROM questions WHERE test_id=$1
        `;

        const result = await this._db.query(query, [
            test
        ]);

        return Collection.convert(Question, result.rows);
    }

    /**
     * Create question
     * @param {Question} question
     * @return {Promise.<Question>}
     */
    async createQuestions(question) {
        const query = `
            INSERT INTO questions(title, content, type, answers, test_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            RETURNING id
        `;

        const result = await this._db.query(query, [
            question.title,
            question.content,
            question.type,
            question.answers,
            question.test.id,
        ]);

        question.setId(result.rows[0].id);

        return question;
    }
}

export default new QuestionsRepository(db);
