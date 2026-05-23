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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,

        title VARCHAR(150) NOT NULL
          CHECK (char_length(title) <= 150),

        description TEXT NOT NULL
          CHECK (char_length(description) >= 20),

        type VARCHAR(20) NOT NULL
          CHECK (type IN ('bug', 'feature_request')),

        status VARCHAR(20) NOT NULL DEFAULT 'open'
          CHECK (status IN ('open', 'in_progress', 'resolved')),

        reporter_id INTEGER NOT NULL
          REFERENCES users(id)
          ON DELETE CASCADE,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};