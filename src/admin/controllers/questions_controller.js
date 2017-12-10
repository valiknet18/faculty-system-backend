import questionsService from '../services/api/questions_service';

class QuestionsController {
    /**
     * @param {QuestionsService} questionsService
     */
    constructor(questionsService) {
        this._questionsService = questionsService;
    }

    /**
     * Get questions
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async getQuestionsAction(req, res) {
        const questions = await this._questionsService.getQuestions(req.params.test);

        res.json({
            questions: questions,
        });
    }

    /**
     * Create questions
     * @param req
     * @param res
     * @return {Promise.<void>}
     */
    async createQuestionAction(req, res) {
        const attributes = Object.assign({}, req.body, {
            test: req.params.test,
        });

        const question = await this._questionsService.createQuestion(attributes);

        res.status(201).json(question);
    }
}

export default new QuestionsController(questionsService);
