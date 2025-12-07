import { neon } from '@neondatabase/serverless';

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!');
  console.error('Available environment variables:', Object.keys(process.env).join(', '));
  throw new Error('DATABASE_URL is required. Please set it in your environment variables.');
}

console.log('✅ DATABASE_URL is set');

const sql = neon(process.env.DATABASE_URL);

export default sql;

// Test database connection
export const testConnection = async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully:', result[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};
