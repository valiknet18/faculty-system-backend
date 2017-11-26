import { registrateUserService } from '../../src/api/services/auth';
import User from "../../src/common/models/user";

const users = [
    {
        first_name: 'Valentyn',
        last_name: 'Hrynevich',
        middle_name: 'Olehovich',
        role: User.STUDENT_ROLE,
        password: '112233',
        is_admin: true,
        email: 'admin@example.com',
        science_degree: 'student',
        phone: '0938648289'
    },
    {
        first_name: 'User',
        last_name: 'Teacher',
        middle_name: 'Teacher',
        role: User.TEACHER_ROLE,
        password: '112233',
        is_admin: true,
        email: 'teacher@example.com',
        science_degree: 'teacher',
        phone: '0938648281',
    },
    {
        first_name: 'User',
        last_name: 'Student',
        middle_name: 'Student',
        role: User.STUDENT_ROLE,
        password: '112233',
        is_admin: true,
        email: 'student@example.com',
        science_degree: 'student',
        phone: '0938648333',
        group_id: 1,
    }
];

const fixtures = async () => {
    for (let user of users) {
        await registrateUserService(user);
    }
};

export default fixtures;
