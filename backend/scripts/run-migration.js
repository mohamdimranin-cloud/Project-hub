import '../config/env.js';
import sql from '../config/database.js';

async function runMigration() {
  try {
    console.log('🔄 Running database migration...\n');

    // Add google_id column
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE
    `;
    console.log('✅ Added google_id column');

    // Add profile_completed column
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false
    `;
    console.log('✅ Added profile_completed column');

    // Make password nullable for Google OAuth users
    await sql`
      ALTER TABLE users ALTER COLUMN password DROP NOT NULL
    `;
    console.log('✅ Made password column nullable');

    // Update existing users to mark profile as completed
    const updated = await sql`
      UPDATE users 
      SET profile_completed = true 
      WHERE (phone IS NOT NULL AND phone != '') 
        OR password IS NOT NULL
      RETURNING id
    `;
    console.log(`✅ Marked ${updated.length} existing users as profile completed`);

    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  }
}

runMigration();