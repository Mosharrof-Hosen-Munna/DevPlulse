import dotenv from 'dotenv';
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const config = {
  PORT: process.env.PORT || 5000,
  NEON_DATABASE_URL: process.env.NEON_DATABASE_URL || '',
};

export default config;