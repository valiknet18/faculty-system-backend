import loadFixtures from '../src/fixtures/index';
import app from '../src';
import chai from 'chai';
import chaiHttp from 'chai-http';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const upMigrations = async () => {
    await exec('node node_modules/.bin/db-migrate --env test --config config/database.json up');
    await loadFixtures();
};

export const downMigrations = async () => {
    await exec('node node_modules/.bin/db-migrate --env test --config config/database.json reset');
};

chai.use(chaiHttp);

export const request = chai.request(app);
