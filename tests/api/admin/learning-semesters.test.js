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
    const UPDATE_LEARNING_SEMESTER = '/api/admin/learning-semesters/2';

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

        const learningSemester = res.body.learningSemesters[0];

        expect(learningSemester.id).to.equal(1);
        expect(learningSemester.fromDate).to.equal('2017-01-01T08:00:00.000Z');
        expect(learningSemester.toDate).to.equal('2017-10-01T07:00:00.000Z');
    });

    it('learning semester should be successfully created', async () => {
        const res = await request
            .post(CREATE_LEARNING_SEMESTER)
            .set('Authorization', adminToken)
            .send({
                fromDate: '2017-01-01T10:00:00+0000',
                toDate: '2017-10-01T10:00:00+0000',
            });

        expect(res).to.have.status(201);

        const learningSemester = res.body;

        expect(learningSemester.id).to.equal(2);
        expect(learningSemester.fromDate).to.equal('2017-01-01T10:00:00+0000');
        expect(learningSemester.toDate).to.equal('2017-10-01T10:00:00+0000');
    });

    it('learning semester should be successfully updated', async () => {
        const res = await request
            .put(UPDATE_LEARNING_SEMESTER)
            .set('Authorization', adminToken)
            .send({
                fromDate: '2017-05-01T10:00:00+0000',
                toDate: '2017-10-20T10:00:00+0000',
            });

        expect(res).to.have.status(200);

        const learningSemester = res.body;

        expect(learningSemester.id).to.equal(2);
        expect(learningSemester.fromDate).to.equal('2017-05-01T10:00:00+0000');
        expect(learningSemester.toDate).to.equal('2017-10-20T10:00:00+0000');
    });

    after(async () => {
        await downMigrations();
    })
});
