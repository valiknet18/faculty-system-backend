import dotenv from 'dotenv';
import path from 'path';

if (!process.env.APP_ENV) {
    dotenv.config({
        path: path.join(__dirname, '../../.env')
    })
}
