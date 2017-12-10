import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    STUDENT_EMAIL
} from '../../helpers';


describe('Profile', () => {
    const GET_PROFILE = '/api/profile/self';
    const GET_EVENTS = '/api/profile/self/events';

    let expect = chai.expect;
    let studentToken;

    before(async () => {
        await upMigrations();
        studentToken = await getUserToken(STUDENT_EMAIL);
    });

    it('Profile data should be successfully returned', async () => {
        const res = await request
            .get(GET_PROFILE)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal('User');
        expect(res.body.lastName).to.equal('Student');
    });

    it('Events should be successfully returned', async () => {
        const res = await request
            .get(GET_EVENTS)
            .set('Authorization', studentToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.events).to.be.an('array');

        expect(res.body.events).to.have.lengthOf(2);

        const event = res.body.events[0];
        const event2 = res.body.events[1];

        expect(event.id).to.equal(1);
        expect(event.task.title).to.equal('Task 1');
        expect(event.deadlineDate).to.be.an('string');

        expect(event2.id).to.equal(2);
        expect(event2.task.title).to.equal('Task 2');
        expect(event2.deadlineDate).to.be.an('string');
    });

    after(async () => {
        await downMigrations();
    })
});
