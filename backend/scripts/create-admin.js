import '../config/env.js';
import bcrypt from 'bcryptjs';
import sql from '../config/database.js';

async function createAdmin() {
  try {
    const email = 'admin@test.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (existing.length > 0) {
      // Update existing admin password
      await sql`
        UPDATE users 
        SET password = ${hashedPassword}
        WHERE email = ${email}
      `;
      console.log('✅ Admin password updated!');
    } else {
      // Create new admin
      await sql`
        INSERT INTO users (email, password, name, phone, branch, college, role, is_active, profile_completed)
        VALUES (${email}, ${hashedPassword}, 'Admin User', '1234567890', 'N/A', 'N/A', 'admin', true, true)
      `;
      console.log('✅ Admin user created!');
    }

    console.log('\n📋 Admin Credentials:');
    console.log('   Email: admin@test.com');
    console.log('   Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();