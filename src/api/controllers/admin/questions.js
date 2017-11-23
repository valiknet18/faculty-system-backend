import { getQuestionsService, createQuestionService } from '../../services/admin/questions';

export const getQuestionsAction = async (req, res) => {
    const questions = await getQuestionsService(req.params);

    res.json({
        questions: questions,
    });
};

export const createQuestionAction = async (req, res) => {
    const attributes = Object.assign({}, req.params, req.body);

    await createQuestionService(attributes);

    res.status(201).json({});
};
