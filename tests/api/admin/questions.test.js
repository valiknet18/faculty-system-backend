import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


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
        expect(res.body.questions).to.have.lengthOf(2);

        const question = res.body.questions[0];

        expect(question.id).to.equal(1);
        expect(question.title).to.equal('Question 1');
        expect(question.content).to.equal('Hello world 1');
    });

    it('question should be successfully created', async () => {
        const res = await request
            .post(CREATE_QUESTION)
            .set('Authorization', adminToken)
            .send({
                title: 'Test question',
                content: 'Simple question',
                type: 'simple',
            });

        expect(res).to.have.status(201);

        const question = res.body;

        expect(question.id).to.equal(3);
        expect(question.title).to.equal('Test question');
        expect(question.content).to.equal('Simple question');
    });

    after(async () => {
        await downMigrations();
    })
});
