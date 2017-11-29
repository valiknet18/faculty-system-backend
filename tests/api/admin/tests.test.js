import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin tests', () => {
    const CREATE_TEST = '/api/admin/subjects/1/tests';
    const GET_TESTS = '/api/admin/subjects/1/tests';

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

        const test = res.body.tests[0];

        expect(test.id).to.equal(1);
        expect(test.title).to.equal('Test 1');
    });

    it('test should be successfully created', async () => {
        const res = await request
            .post(CREATE_TEST)
            .set('Authorization', adminToken)
            .send({
                title: 'Test test',
            });

        expect(res).to.have.status(201);

        const test = res.body;

        expect(test.id).to.equal(3);
        expect(test.title).to.equal('Test test');
    });

    after(async () => {
        await downMigrations();
    })
});
