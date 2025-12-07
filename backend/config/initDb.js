import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL);

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');

    // Read and execute schema
    const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        await sql(statement);
      } catch (error) {
        // Ignore errors for statements that might already exist
        if (!error.message.includes('already exists')) {
          console.error('Error executing statement:', error.message);
        }
      }
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert default users with hashed passwords
    await sql`
      INSERT INTO users (email, password, name, phone, branch, college, role, is_active)
      VALUES 
        ('admin@test.com', ${hashedPassword}, 'Admin User', '7892856055', 'N/A', 'N/A', 'admin', true),
        ('student@test.com', ${hashedPassword}, 'Test Student', '+1234567890', 'Computer Science', 'Test University', 'requester', true)
      ON CONFLICT (email) DO NOTHING
    `;

    console.log('✅ Database initialized successfully!');
    console.log('📝 Default accounts created:');
    console.log('   Admin: admin@test.com / password123');
    console.log('   Student: student@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
