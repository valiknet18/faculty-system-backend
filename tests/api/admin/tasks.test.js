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
    const UPDATE_TASK = '/api/admin/subjects/1/themes/1/tasks/3';

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

        const task = res.body.tasks[0];

        expect(task.id).to.equal(1);
        expect(task.title).to.equal('Task 1');
        expect(task.content).to.equal('Tasks content');
    });

    it('task should be successfully created', async () => {
        const res = await request
            .post(CREATE_TASK)
            .set('Authorization', adminToken)
            .send({
                title: 'Test task',
                content: 'Content',
                test_id: 1,
            });

        expect(res).to.have.status(201);

        const task = res.body;

        expect(task.id).to.equal(3);
        expect(task.title).to.equal('Test task');
        expect(task.content).to.equal('Content');
        expect(task.test.id).to.equal(1);
    });

    it('task should be successfully created without test_id', async () => {
        const res = await request
            .post(CREATE_TASK)
            .set('Authorization', adminToken)
            .send({
                title: 'Test task',
                content: 'Content',
            });

        expect(res).to.have.status(201);

        const task = res.body;

        expect(task.id).to.equal(4);
        expect(task.title).to.equal('Test task');
        expect(task.content).to.equal('Content');
        expect(task.test).to.equal(null);
    });

    it('task should be successfully updated without test_id', async () => {
        const res = await request
            .put(UPDATE_TASK)
            .set('Authorization', adminToken)
            .send({
                title: 'Updated task',
                content: 'Updated Content',
            });

        expect(res).to.have.status(200);

        const task = res.body;

        expect(task.id).to.equal(3);
        expect(task.title).to.equal('Updated task');
        expect(task.content).to.equal('Updated Content');
        expect(task.test).to.equal(null);
    });

    it('task should be successfully updated', async () => {
        const res = await request
            .put(UPDATE_TASK)
            .set('Authorization', adminToken)
            .send({
                title: 'Updated task',
                content: 'Updated Content',
                test_id: 2,
            });

        expect(res).to.have.status(200);

        const task = res.body;

        expect(task.id).to.equal(3);
        expect(task.title).to.equal('Updated task');
        expect(task.content).to.equal('Updated Content');
        expect(task.test.id).to.equal(2);
    });

    after(async () => {
        await downMigrations();
    })
});
