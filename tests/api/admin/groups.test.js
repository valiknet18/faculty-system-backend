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
    const UPDATE_GROUP = '/api/admin/groups/2';
    const GET_GROUPS = '/api/admin/groups';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of groups should be successfully returned', async () => {
        const res = await request
            .get(GET_GROUPS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.groups).to.have.lengthOf(1);

        const group = res.body.groups[0];

        expect(group.id).to.equal(1);
        expect(group.name).to.equal('Group 1')
    });

    it('group should be successfully created', async () => {
        const res = await request
            .post(CREATE_GROUP)
            .set('Authorization', adminToken)
            .send({
                name: 'Test group',
            });

        expect(res).to.have.status(201);

        const group = res.body;

        expect(group.id).to.equal(2);
        expect(group.name).to.equal('Test group')
    });

    it('group should be successfully updated', async () => {
        const res = await request
            .put(UPDATE_GROUP)
            .set('Authorization', adminToken)
            .send({
                name: 'Updated group',
            });

        expect(res).to.have.status(200);

        const group = res.body;

        expect(group.id).to.equal(2);
        expect(group.name).to.equal('Updated group')
    });

    after(async () => {
        await downMigrations();
    })
});
