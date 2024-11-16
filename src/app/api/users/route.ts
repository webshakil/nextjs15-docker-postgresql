import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432, 
  });

export async function POST(request: Request) {
  try {
    const { name, email, emailVerified, image, role } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Insert data into the `users` table
    const query = `
      INSERT INTO users (name, email, "emailVerified", image, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, email, emailVerified, image, role || 'USER'];

    const result = await pool.query(query, values);

    return NextResponse.json(
      { message: 'User created successfully', user: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inserting user:', error);
    return NextResponse.json(
      { error: 'Failed to insert user into the database.' },
      { status: 500 }
    );
  }
}
