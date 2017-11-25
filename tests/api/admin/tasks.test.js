import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin tasks', () => {
    const CREATE_TASK = '/api/admin/subjects/1/themes/1/tasks';
    const GET_TASKS = '/api/admin/subjects/1/themes/1/tasks';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of tasks should be successfully returned', async () => {
        const res = await request
            .get(GET_TASKS)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.tasks).to.have.lengthOf(2);
    });

    it('task should be successfully created', async () => {
        const res = await request
            .post(CREATE_TASK)
            .set('Authorization', adminToken)
            .send({
                title: 'Test task',
                content: 'Content',
            });

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
