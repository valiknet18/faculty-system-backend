import chai from 'chai';
import { downMigrations, upMigrations, request } from '../../helpers';


describe('Authorization', () => {
    const LOGIN_PATH = '/api/auth/login';

    let expect = chai.expect;

    before(async () => {
        await upMigrations();
    });

    it('user should be successfully logged in', async () => {
        const res = await request
            .post(LOGIN_PATH)
            .send({
                email: 'admin@example.com',
                password: '112233',
            });

        expect(res).to.have.status(201);

        const user = res.body;

        expect(user.token).to.have.be.an('string');
        expect(user.profile).to.have.be.an('object');
        expect(user.profile.firstName).to.equal('Valentyn');
        expect(user.profile.lastName).to.equal('Hrynevich');
        expect(user.profile.email).to.equal('admin@example.com');
    });

    it('user should receive auth error', async () => {
        try {
            await request
                .post(LOGIN_PATH)
                .send({
                    email: 'invalid@example.com',
                    password: '111111'
                });
        } catch (exception) {
            expect(exception.response).to.have.status(404);
        }
    });

    after(async () => {
        await downMigrations();
    })
});
