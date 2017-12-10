import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';
import {
    MULTIPLE_ANSWERS_TYPE, RELATIONS_TYPE, SINGLE_ANSWER_TYPE,
    WRITE_TYPE
} from '../../../src/common/models/question';


describe('Admin questions', () => {
    const CREATE_QUESTION = '/api/admin/subjects/1/tests/1/questions';
    const GET_QUESTIONS = '/api/admin/subjects/1/tests/1/questions';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of questions should be successfully returned', async () => {
        const res = await request
            .get(GET_QUESTIONS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.questions).to.have.lengthOf(4);

        const question = res.body.questions[0];

        expect(question.id).to.equal(1);
        expect(question.title).to.equal('Question 1');
        expect(question.content).to.equal('Hello world 1');
    });

    it('question with single answer should be successfully created', async () => {
        const res = await request
            .post(CREATE_QUESTION)
            .set('Authorization', adminToken)
            .send({
                title: 'Test question',
                content: 'Simple question',
                type: SINGLE_ANSWER_TYPE,
                answers: [
                    {
                        content: 'First question',
                        isCorrect: true,
                    },
                    {
                        content: 'Second question',
                        isCorrect: false,
                    },
                    {
                        content: 'Third question',
                        isCorrect: false,
                    },
                    {
                        content: 'Fourth question',
                        isCorrect: false,
                    },
                ]
            });

        expect(res).to.have.status(201);

        const question = res.body;

        expect(question.id).to.equal(5);
        expect(question.title).to.equal('Test question');
        expect(question.content).to.equal('Simple question');
    });

    it('question with multiple answers should be successfully created', async () => {
        const res = await request
            .post(CREATE_QUESTION)
            .set('Authorization', adminToken)
            .send({
                title: 'Test question 1',
                content: 'Simple question 1',
                type: MULTIPLE_ANSWERS_TYPE,
                answers: [
                    {
                        content: 'First question',
                        isCorrect: true,
                    },
                    {
                        content: 'Second question',
                        isCorrect: false,
                    },
                    {
                        content: 'Third question',
                        isCorrect: true,
                    },
                    {
                        content: 'Fourth question',
                        isCorrect: false,
                    },
                ]
            });

        expect(res).to.have.status(201);

        const question = res.body;

        expect(question.id).to.equal(6);
        expect(question.title).to.equal('Test question 1');
        expect(question.content).to.equal('Simple question 1');
    });

    it('question with write answer should be successfully created', async () => {
        const res = await request
            .post(CREATE_QUESTION)
            .set('Authorization', adminToken)
            .send({
                title: 'Test question 2',
                content: 'Simple question 2',
                type: WRITE_TYPE,
                answers: {
                    content: 'First question',
                },
            });

        expect(res).to.have.status(201);

        const question = res.body;

        expect(question.id).to.equal(7);
        expect(question.title).to.equal('Test question 2');
        expect(question.content).to.equal('Simple question 2');
    });

    it('question with related answers should be successfully created', async () => {
        const res = await request
            .post(CREATE_QUESTION)
            .set('Authorization', adminToken)
            .send({
                title: 'Test question 3',
                content: 'Simple question 3',
                type: RELATIONS_TYPE,
                answers: [
                    {
                        question: 'Question',
                        answer: 'Answer',
                    },
                    {
                        question: 'Question 1',
                        answer: 'Answer 1',
                    },
                    {
                        question: 'Question 2',
                        answer: 'Answer 2',
                    },
                    {
                        question: 'Question 2',
                        answer: 'Answer 2',
                    },
                ],
            });

        expect(res).to.have.status(201);

        const question = res.body;

        expect(question.id).to.equal(8);
        expect(question.title).to.equal('Test question 3');
        expect(question.content).to.equal('Simple question 3');
    });

    after(async () => {
        await downMigrations();
    })
});
