import db from '../../config/db';
import { serialize } from '../serializers/users';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TokenGenerator from 'uuid-token-generator';

export const getUserByEmail = async (email) => {
    const query = `
        SELECT id, first_name, last_name, email, role, is_admin, password, group_id
        FROM users 
        WHERE email=$1 
        LIMIT 1
    `;
    const result = await db.query(query, [email]);

    if (!result.rows.length) {
        return false;
    }

    return User.fromArray(result.rows[0]);
}

export const authService = async (email, password) => {
    const user = await getUserByEmail(email)

    const res = await bcrypt.compare(password, user.getPassword());

    if (!res) {
        return false;
    }

    return user;
}

export const jwtService = (user) => {
    const token = jwt.sign(
        serialize(user), 
        process.env.APP_SECRET
    );

    return token;
}

export const inviteService = async (parameters) => {
    const query = `
        INSERT INTO invited_users(
            email, token, invited_at, role
        )
        VALUES ($1, $2, $3, $4)
    `;

    const res = db.query(query, [
        parameters['email'],
        new TokenGenerator(256, TokenGenerator.BASE62),
        new Date(),
        parameters['role']
    ]);
}

export const registrateUserService = async (parameters) => {
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
            email, phone, registered_at
        ) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const res = await db.query(query, [
        user.getFirstName(),
        user.getLastName(),
        user.getMiddleName(),
        user.getRole(),
        hash,
        user.getIsAdmin(),
        user.getScienceDegree(),
        user.getEmail(),
        user.getPhone(),
        new Date()
    ]); 
}
