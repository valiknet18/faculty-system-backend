import jwt from 'express-jwt';

const jwtService = jwt({
    secret: process.env.APP_SECRET
}).unless({
    path: [
        '/api/auth/login',
        '/api/auth/registration',
        /\/doc*/
    ]
});

export default jwtService;
