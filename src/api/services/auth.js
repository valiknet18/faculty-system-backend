import db from '../../config/db';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUserByEmail = async (email) => {
    const query = `
        SELECT id, first_name, last_name, email, role, is_admin, group_id
        FROM users 
        WHERE email=$1 
        LIMIT 1
    `;
    const result = await db.query(query, [email]);

    if (!result.rows.length) {
        return false;
    }

    return User.fromArray(result.rows[0]);
};

export const authService = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        return false;
    }

    const query = `SELECT password FROM users WHERE id=$1`;

    const result = await db.query(query, [
        user.getId()
    ]);

    const res = await bcrypt.compare(password, result.rows[0]['password']);

    if (!res) {
        return false;
    }

    return user;
};

export const jwtService = (user) => {
    const restrictedUser = {
        id: user.getId(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        middle_name: user.getMiddleName(),
        email: user.getEmail()
    };

    return jwt.sign(
        restrictedUser,
        process.env.APP_SECRET
    );
};

export const registrateUserService = async (parameters, invitedUser = null) => {
    const salt = await bcrypt.genSaltSync(
        parseInt(process.env.APP_ROUNDS)
    );
    const hash = await bcrypt.hash(
        parameters['password'],
        salt
    );
    const user = User.fromArray(parameters);

    const query = `
        INSERT INTO users(
            first_name, last_name, middle_name, role, 
            password, is_admin, science_degree, 
            email, phone, registered_at, group_id
        ) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    const res = await db.query(query, [
        user.getFirstName(),
        user.getLastName(),
        user.getMiddleName(),
        user.getRole() || invitedUser['role'],
        hash,
        user.getIsAdmin(),
        user.getScienceDegree(),
        user.getEmail(),
        user.getPhone(),
        new Date(),
        user.getGroupId()
    ]); 
};
