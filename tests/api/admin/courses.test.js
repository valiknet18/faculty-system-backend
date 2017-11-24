import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin courses', () => {
    const GET_COURSES = '/api/admin/courses';
    const CREATE_COURSE = '/api/admin/courses';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of courses should be successfully returned', async () => {
        const res = await request
            .get(GET_COURSES)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.courses).to.have.lengthOf(1);
    });

    it('course should be successfully created', async () => {
        const res = await request
            .post(CREATE_COURSE)
            .set('Authorization', adminToken)
            .send({
                teacher: 1,
                learningSemester: 1,
                subject: 2,
                group: 1,
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
