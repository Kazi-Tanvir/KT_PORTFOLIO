import mysql from 'mysql2/promise';

// Create a connection pool using your existing connection string
// Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
const pool = mysql.createPool(process.env.DATABASE_URL as string);

export default pool;