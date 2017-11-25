import loadFixtures from '../src/fixtures/index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {getUserByEmail, jwtService} from "../src/api/services/auth";

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const ADMIN_EMAIL = 'admin@example.com';
export const STUDENT_EMAIL = 'student@example.com';

export const upMigrations = async () => {
    await exec('node node_modules/.bin/db-migrate --env test --config config/database.json up');
    await loadFixtures();
};

export const downMigrations = async () => {
    await exec('node node_modules/.bin/db-migrate --env test --config config/database.json reset');
};

export const getUserToken = async (email) => {
    const user = await getUserByEmail(email);
    const token = jwtService(user);

    return 'Bearer ' + token;
};

chai.use(chaiHttp);

export const request = chai.request(app);
