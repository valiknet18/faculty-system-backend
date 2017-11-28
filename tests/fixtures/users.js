import usersService from "../../src/app/services/auth_service";
import User, { STUDENT_ROLE, TEACHER_ROLE } from "../../src/common/models/user";

const users = [
    {
        first_name: 'Valentyn',
        last_name: 'Hrynevich',
        middle_name: 'Olehovich',
        role: STUDENT_ROLE,
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
        role: TEACHER_ROLE,
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
        role: STUDENT_ROLE,
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
        await usersService.registration(user);
    }
};

export default fixtures;
