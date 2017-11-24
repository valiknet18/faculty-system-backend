import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin users', () => {
    const GET_SUBJECTS = '/api/admin/users';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of users should be successfully returned', async () => {
        const res = await request
            .get(GET_SUBJECTS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.users).to.have.lengthOf(2);
    });

    after(async () => {
        await downMigrations();
    })
});
