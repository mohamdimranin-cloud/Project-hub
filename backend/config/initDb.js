import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');

    // Create Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        branch VARCHAR(100),
        college VARCHAR(255),
        role VARCHAR(20) DEFAULT 'requester' CHECK (role IN ('requester', 'admin')),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Users table created');

    // Create Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        project_type VARCHAR(20) NOT NULL CHECK (project_type IN ('mini', 'major', 'prototype', 'design')),
        budget DECIMAL(10, 2),
        deadline DATE NOT NULL,
        technologies TEXT[],
        phone VARCHAR(20),
        status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in-review', 'accepted', 'in-progress', 'delivered', 'completed', 'rejected')),
        requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        assigned_developer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        estimated_delivery DATE,
        accepted_at TIMESTAMP,
        completed_at TIMESTAMP,
        admin_notes TEXT,
        source_code_link VARCHAR(500),
        delivery_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Projects table created');

    // Add source_code_link and delivery_notes columns if they don't exist (migration)
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS source_code_link VARCHAR(500),
      ADD COLUMN IF NOT EXISTS delivery_notes TEXT
    `;
    console.log('✅ Projects table migrated with source code columns');

    // Add download_unlocked column if it doesn't exist
    await sql`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS download_unlocked BOOLEAN DEFAULT false
    `;
    console.log('✅ Projects table migrated with download lock column');

    // Create Progress Updates Table
    await sql`
      CREATE TABLE IF NOT EXISTS progress_updates (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        percentage INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Progress updates table created');

    // Create Notifications Table
    await sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'info',
        related_project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Notifications table created');

    // Create Settings Table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Settings table created');

    // Create Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_projects_requester ON projects(requester_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id)`;
    console.log('✅ Indexes created');

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert default users
    await sql`
      INSERT INTO users (email, password, name, phone, branch, college, role, is_active)
      VALUES 
        ('admin@test.com', ${hashedPassword}, 'Admin User', '7892856055', 'N/A', 'N/A', 'admin', true),
        ('student@test.com', ${hashedPassword}, 'Test Student', '+1234567890', 'Computer Science', 'Test University', 'requester', true)
      ON CONFLICT (email) DO NOTHING
    `;
    console.log('✅ Default users created');

    // Insert default settings
    await sql`
      INSERT INTO settings (key, value) VALUES
      ('faqs', '[{"question": "How long does it take?", "answer": "Depends on project complexity"}, {"question": "What payment methods?", "answer": "UPI, Card, Net Banking"}]'::jsonb),
      ('contact', '{"email": "support@projecthub.com", "phone": "+1234567890", "address": "123 Main St, City"}'::jsonb),
      ('pricing', '{"mini": 5000, "major": 15000}'::jsonb)
      ON CONFLICT (key) DO NOTHING
    `;
    console.log('✅ Default settings created');

    console.log('\n✅ Database initialized successfully!');
    console.log('📝 Default accounts:');
    console.log('   👨‍💼 Admin: admin@test.com / password123');
    console.log('   👨‍🎓 Student: student@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
