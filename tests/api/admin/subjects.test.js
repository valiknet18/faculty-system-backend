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

        const subject = res.body.subjects[0];

        expect(subject.id).to.equal(1);
        expect(subject.name).to.equal('Subject 1');
    });

    it('subject should be successfully created', async () => {
        const res = await request
            .post(CREATE_SUBJECT)
            .set('Authorization', adminToken)
            .send({
                name: 'Test subject 1',
            });

        expect(res).to.have.status(201);

        const subject = res.body;

        expect(subject.id).to.equal(3);
        expect(subject.name).to.equal('Test subject 1');
    });

    after(async () => {
        await downMigrations();
    })
});
