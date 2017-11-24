import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin groups', () => {
    const CREATE_GROUP = '/api/admin/groups';
    const GET_GROUPS = '/api/admin/groups';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('group should be successfully created', async () => {
        const res = await request
            .post(CREATE_GROUP)
            .set('Authorization', adminToken)
            .send({
                name: 'Test group',
            });

        expect(res).to.have.status(201);
    });

    it('list of groups should be successfully returned', async () => {
        const res = await request
            .get(GET_GROUPS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.groups).to.have.lengthOf(2);
    });

    after(async () => {
        await downMigrations();
    })
});
