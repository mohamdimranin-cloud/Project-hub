import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  try {
    console.log('🔄 Running database migration...');

    // Add source_code_link and delivery_notes columns
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS source_code_link VARCHAR(500),
      ADD COLUMN IF NOT EXISTS delivery_notes TEXT
    `;
    console.log('✅ Added source_code_link and delivery_notes columns to projects table');

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_projects_source_code 
      ON projects(source_code_link) 
      WHERE source_code_link IS NOT NULL
    `;
    console.log('✅ Created index for source_code_link');

    // Add download_unlocked column
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS download_unlocked BOOLEAN DEFAULT false
    `;
    console.log('✅ Added download_unlocked column to projects table');

    // Create index for download_unlocked
    await sql`
      CREATE INDEX IF NOT EXISTS idx_projects_download_unlocked 
      ON projects(download_unlocked) 
      WHERE download_unlocked = true
    `;
    console.log('✅ Created index for download_unlocked');

    // Add prototype and documentation fields
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS problem_statement TEXT,
      ADD COLUMN IF NOT EXISTS target_platform VARCHAR(100),
      ADD COLUMN IF NOT EXISTS prototype_type VARCHAR(100),
      ADD COLUMN IF NOT EXISTS preferred_tools VARCHAR(255),
      ADD COLUMN IF NOT EXISTS number_of_screens INTEGER,
      ADD COLUMN IF NOT EXISTS reference_designs TEXT,
      ADD COLUMN IF NOT EXISTS document_type VARCHAR(100),
      ADD COLUMN IF NOT EXISTS college_format VARCHAR(255),
      ADD COLUMN IF NOT EXISTS number_of_pages INTEGER,
      ADD COLUMN IF NOT EXISTS plagiarism_limit VARCHAR(50),
      ADD COLUMN IF NOT EXISTS reference_file TEXT,
      ADD COLUMN IF NOT EXISTS special_instructions TEXT
    `;
    console.log('✅ Added prototype and documentation fields');

    // Update project_type constraint
    await sql`ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_project_type_check`;
    await sql`ALTER TABLE projects ADD CONSTRAINT projects_project_type_check CHECK (project_type IN ('mini', 'major', 'prototype', 'design'))`;
    console.log('✅ Updated project_type constraint');

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
