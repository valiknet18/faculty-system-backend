import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin questions', () => {
    const CREATE_TEST = '/api/admin/subjects/1/tests/1/questions';
    const GET_TESTS = '/api/admin/subjects/1/tests/1/questions';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of tests should be successfully returned', async () => {
        const res = await request
            .get(GET_TESTS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.tests).to.have.lengthOf(2);
    });

    it('test should be successfully created', async () => {
        const res = await request
            .post(CREATE_TEST)
            .set('Authorization', adminToken)
            .send({
                title: 'Test test',
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
