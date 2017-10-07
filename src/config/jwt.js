import jwt from 'express-jwt';

const jwtService = jwt({
    secret: process.env.APP_SECRET
}).unless({
    path: [
        '/api/auth/login'
    ]
});

export default jwtService;
