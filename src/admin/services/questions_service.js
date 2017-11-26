import questionsRepository from '../repositories/questions_repository';
import Question from "../../common/models/question";

class QuestionsService {
    /**
     * @param {QuestionsRepository} questionsRepository
     */
    constructor(questionsRepository) {
        this._questionsRepository = questionsRepository;
    }

    /**
     * Get questions
     * @param test
     * @return {Promise.<Array>}
     */
    async getQuestions(test) {
        return await this._questionsRepository.getQuestions(test);
    }

    /**
     * Create question
     * @param attributes
     * @return {Promise.<Question>}
     */
    async createQuestion(attributes) {
        return await this._questionsRepository.createQuestions(
            Question.fromArray(attributes)
        );
    }
}

export default new QuestionsService(questionsRepository);
