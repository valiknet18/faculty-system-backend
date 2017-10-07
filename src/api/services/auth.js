import db from '../../config/db';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authService = async (email, password) => {
    const query = `
        SELECT id, first_name, last_name, email, password 
        FROM users 
        WHERE email=$1 
        LIMIT 1
    `;
    const user = await db.query(query, [email]);

    if (!user) {
        return false;
    }

    const res = bcrypt.compare(password, user.rows['0']['password'])

    if (!res) {
        return false;
    }

    return User.fromArray(user);
}

export const jwtService = async (user) => {
    return jwt.sign(
        uset.toArray(), 
        process.env.APP_SECRET
    );
}

export const inviteService = async (user) => {
    const hash = await bcrypt.hash(
        user.getPassword(),
        process.env.APP_SECRET
    );

    const query = `
        INSERT INTO users(first_name, last_name, email, password) 
        VALUES($1, $2, $3, $4)
    `;
    const res = await db.query(query, [
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        hash
    ]);
}
