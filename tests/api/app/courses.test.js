import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    STUDENT_EMAIL
} from '../../helpers';


describe('Student courses', () => {
    const GET_COURSES = '/api/courses';
    const GET_COURSE = '/api/courses/1';

    let expect = chai.expect;
    let studentToken;

    before(async () => {
        await upMigrations();
        studentToken = await getUserToken(STUDENT_EMAIL);
    });

    it('list of courses should be successfully returned for student', async () => {
        const res = await request
            .get(GET_COURSES)
            .set('Authorization', studentToken);

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

    it('course should be successfully returned for student', async () => {
        const res = await request
            .get(GET_COURSE)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');

        const course = res.body;

        expect(course.id).to.equal(1);
        expect(course.subject.name).to.equal('Subject 1');
        expect(course.teacher.firstName).to.equal('Valentyn');
        expect(course.teacher.lastName).to.equal('Hrynevich');
        expect(course.group.name).to.equal('Group 1');
    });

    after(async () => {
        await downMigrations();
    })
});
