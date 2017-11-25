import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin users', () => {
    const GET_USERS = '/api/admin/users';
    const INVITE_USER = '/api/admin/users';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of users should be successfully returned', async () => {
        const res = await request
            .get(GET_USERS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.users).to.have.lengthOf(3);
    });

    it('user should be successfully invited', async () => {
        const res = await request
            .post(INVITE_USER)
            .set('Authorization', adminToken)
            .send({
                email: 'student2@example.com',
                role: 'student',
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
