import questionsService from '../../src/admin/services/api/questions_service';
import {
    SINGLE_ANSWER_TYPE,
    MULTIPLE_ANSWERS_TYPE,
    WRITE_TYPE,
    RELATIONS_TYPE
} from '../../src/common/models/question';

const questions = [
    {
        title: 'Question 1',
        content: 'Hello world 1',
        type: SINGLE_ANSWER_TYPE,
        test: 1,
        answers: [
            {
                content: 'Hello 1',
                isCorrect: true,
            },
            {
                content: 'Hello 2',
                isCorrect: false,
            },
            {
                content: 'Hello 3',
                isCorrect: false,
            },
            {
                content: 'Hello 4',
                isCorrect: false,
            },
        ]
    },
    {
        title: 'Question 2',
        content: 'Hello world 2',
        type: MULTIPLE_ANSWERS_TYPE,
        test: 1,
        answers: [
            {
                content: 'Hello 1',
                isCorrect: true,
            },
            {
                content: 'Hello 2',
                isCorrect: false,
            },
            {
                content: 'Hello 3',
                isCorrect: true,
            },
            {
                content: 'Hello 4',
                isCorrect: false,
            },
        ],
    },
    {
        title: 'Question 3',
        content: 'Hello world 3',
        type: WRITE_TYPE,
        test: 1,
        answers: {
            content: 'writable',
        },
    },
    {
        title: 'Question 2',
        content: 'Hello world 2',
        type: RELATIONS_TYPE,
        test: 1,
        answers: [
            {
                question: 'Hello 1',
                answer: 'Answer 1',
            },
            {
                question: 'Hello 2',
                answer: 'Answer 2',
            },
            {
                question: 'Hello 3',
                answer: 'Answer 3',
            },
            {
                question: 'Hello 4',
                answer: 'Answer 4',
            },
        ],
    }
];

const fixtures = async () => {
    for (let question of questions) {
        await questionsService.createQuestion(question);
    }
};

export default fixtures;
