import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin learning semesters', () => {
    const GET_LEARNING_SEMESTERS = '/api/admin/learning-semesters';
    const CREATE_LEARNING_SEMESTER = '/api/admin/learning-semesters';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of learning semesters should be successfully returned', async () => {
        const res = await request
            .get(GET_LEARNING_SEMESTERS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.learningSemesters).to.have.lengthOf(1);
    });

    it('learning semester should be successfully created', async () => {
        const res = await request
            .post(CREATE_LEARNING_SEMESTER)
            .set('Authorization', adminToken)
            .send({
                fromDate: '2017-01-01T10:00',
                toDate: '2017-10-01T10:00',
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
