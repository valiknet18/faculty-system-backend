import questionsService from '../../src/admin/services/questions_service';

const questions = [
    {
        title: 'Question 1',
        content: 'Hello world 1',
        type: 'simple',
        test: 1
    },
    {
        title: 'Question 2',
        content: 'Hello world 2',
        type: 'simple',
        test: 1
    }
];

const fixtures = async () => {
    for (let question of questions) {
        await questionsService.createQuestion(question);
    }
};

export default fixtures;
