import dotenv from 'dotenv';
import sql from '../config/database.js';

dotenv.config();

async function migrate() {
  try {
    console.log('🔄 Adding Google OAuth support...');
    
    // Add google_id column
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE
    `;
    console.log('✅ Added google_id column');
    
    // Make password optional
    await sql`
      ALTER TABLE users 
      ALTER COLUMN password DROP NOT NULL
    `;
    console.log('✅ Made password optional');
    
    // Add index
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)
    `;
    console.log('✅ Added index on google_id');
    
    console.log('✅ Google OAuth migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
