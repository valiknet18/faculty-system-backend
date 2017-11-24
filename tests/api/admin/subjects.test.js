import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin subjects', () => {
    const CREATE_SUBJECT = '/api/admin/subjects';
    const GET_SUBJECTS = '/api/admin/subjects';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of subjects should be successfully returned', async () => {
        const res = await request
            .get(GET_SUBJECTS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.subjects).to.have.lengthOf(2);
    });

    it('subject should be successfully created', async () => {
        const res = await request
            .post(CREATE_SUBJECT)
            .set('Authorization', adminToken)
            .send({
                name: 'Test subject 1',
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
