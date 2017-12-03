import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    STUDENT_EMAIL
} from '../../helpers';


describe('Profile', () => {
    const GET_PROFILe = '/api/profile/self';

    let expect = chai.expect;
    let studentToken;

    before(async () => {
        await upMigrations();
        studentToken = await getUserToken(STUDENT_EMAIL);
    });

    it('Profile data should be successfully returned', async () => {
        const res = await request
            .get(GET_PROFILe)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal('User');
        expect(res.body.lastName).to.equal('Student');
    });

    after(async () => {
        await downMigrations();
    })
});
