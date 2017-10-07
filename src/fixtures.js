import './config/index';
import { registrateUserService } from './api/services/auth';

const users = [
    {
        first_name: 'Valentyn',
        last_name: 'Hrynevich',
        middle_name: 'Olehovich',
        role: 'student',
        password: '112233',
        is_admin: true,
        email: 'admin@example.com',
        science_degree: 'student',
        phone: '0938648289'
    }
];

const fixtures = async (users) => {
    for (let user of users) {
        await registrateUserService(user);
    }
}

fixtures(users);
