import { Pool } from 'pg';

const pool = new Pool({
    'host': process.env.DATABASE_HOST,
    'port': 5432,
    'user': process.env.DATABASE_USER,
    'database': process.env.DATABASE_NAME
});

export default pool;
