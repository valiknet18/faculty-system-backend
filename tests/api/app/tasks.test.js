import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    STUDENT_EMAIL
} from '../../helpers';


describe('Student tasks', () => {
    const GET_TASKS = '/api/courses/1/tasks';
    const MOVE_TASK = '/api/courses/1/tasks/1/move';

    let expect = chai.expect;
    let studentToken;

    before(async () => {
        await upMigrations();
        studentToken = await getUserToken(STUDENT_EMAIL);
    });

    it('list of tasks should be successfully returned for student', async () => {
        const res = await request
            .get(GET_TASKS)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.tasks).to.be.an('object');
        expect(res.body.tasks.backlog).to.have.lengthOf(2);
        expect(res.body.tasks.inProgress).to.have.lengthOf(0);
        expect(res.body.tasks.done).to.have.lengthOf(0);
        expect(res.body.tasks.checked).to.have.lengthOf(0);
    });

    it('Task status should be successfully changed', async () => {
        const res = await request
            .put(MOVE_TASK)
            .set('Authorization', studentToken)
            .send({
                status: 'inProgress',
            });

        expect(res).to.have.status(200);
    });

    it('list of tasks should be successfully returned with updates', async () => {
        const res = await request
            .get(GET_TASKS)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.tasks).to.be.an('object');
        expect(res.body.tasks.backlog).to.have.lengthOf(1);
        expect(res.body.tasks.inProgress).to.have.lengthOf(1);
        expect(res.body.tasks.done).to.have.lengthOf(0);
        expect(res.body.tasks.checked).to.have.lengthOf(0);
    });

    after(async () => {
        await downMigrations();
    })
});
