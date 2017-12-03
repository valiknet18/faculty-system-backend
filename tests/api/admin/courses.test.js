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

        const course = res.body.courses[0];

        expect(course.id).to.equal(1);
        expect(course.subject.name).to.equal('Subject 1');
        expect(course.group.name).to.equal('Group 1');
        expect(course.teacher.firstName).to.equal('Valentyn');
        expect(course.teacher.lastName).to.equal('Hrynevich');
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
                finishDate: '2017-12-01T10:00:00+0000'
            });

        expect(res).to.have.status(201);

        const course = res.body;

        expect(course.id).to.equal(2);
        expect(course.subject.id).to.equal(2);
        expect(course.group.id).to.equal(1);
        expect(course.teacher.id).to.equal(1);
        expect(course.finishDate).to.equal('2017-12-01T10:00:00+0000');
    });

    after(async () => {
        await downMigrations();
    })
});
