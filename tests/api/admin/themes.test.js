import chai from 'chai';
import {
    downMigrations,
    upMigrations,
    request,
    getUserToken,
    ADMIN_EMAIL
} from '../../helpers';


describe('Admin themes', () => {
    const CREATE_THEME = '/api/admin/subjects/1/themes';
    const GET_THEMES = '/api/admin/subjects/1/themes';

    let expect = chai.expect;
    let adminToken;

    before(async () => {
        await upMigrations();
        adminToken = await getUserToken(ADMIN_EMAIL);
    });

    it('list of themes should be successfully returned', async () => {
        const res = await request
            .get(GET_THEMES)
            .set('Authorization', adminToken);

        expect(res).to.have.status(200);

        expect(res.body).to.be.an('object');
        expect(res.body.themes).to.have.lengthOf(2);

        const theme = res.body.themes[0];

        expect(theme.id).to.equal(1);
        expect(theme.title).to.equal('Title 1');
    });

    it('theme should be successfully created', async () => {
        const res = await request
            .post(CREATE_THEME)
            .set('Authorization', adminToken)
            .send({
                title: 'Test theme',
            });

        expect(res).to.have.status(201);

        const theme = res.body;

        expect(theme.id).to.equal(3);
        expect(theme.title).to.equal('Test theme');
    });

    after(async () => {
        await downMigrations();
    })
});
