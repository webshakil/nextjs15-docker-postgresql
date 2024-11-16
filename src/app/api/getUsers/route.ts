import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize the PostgreSQL pool with your environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function GET() {
  try {
    // Query to get all users
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);

    // Return the users as a JSON response
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
