import assert from 'assert';
import chai from 'chai';
import { downMigrations, upMigrations, request } from '../../helpers';


describe('Authorization', () => {
    let expect = chai.expect;

    before(async () => {
        await upMigrations();
    });

    it('should be true', async () => {
        const res = await request
            .post('/api/auth/login')
            .send({
                email: 'admin@example.com',
                password: '112233',
            })
            .set('Content-Type', 'application/json');

        expect(res).to.have.status(201);
    });

    after(async () => {
        await downMigrations();
    })
});
