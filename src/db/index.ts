import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.NEON_DATABASE_URL,
})

export const initDB = async () => { 
    try {
        // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,

        name VARCHAR(255) NOT NULL,

        email VARCHAR(255) NOT NULL UNIQUE,

        password TEXT NOT NULL,

        role VARCHAR(20) NOT NULL DEFAULT 'contributor'
          CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};