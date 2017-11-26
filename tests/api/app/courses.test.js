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
    });

    it('course should be successfully returned for student', async () => {
        const res = await request
            .get(GET_COURSE)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
    });

    after(async () => {
        await downMigrations();
    })
});
