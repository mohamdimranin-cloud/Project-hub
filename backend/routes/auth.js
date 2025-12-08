import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from '../config/database.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone, branch, college, role } = req.body;
    
    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user into database
    const newUser = await sql`
      INSERT INTO users (email, password, name, phone, branch, college, role, is_active)
      VALUES (
        ${email},
        ${hashedPassword},
        ${name},
        ${phone || ''},
        ${branch || ''},
        ${college || ''},
        ${role || 'requester'},
        true
      )
      RETURNING id, email, name, phone, branch, college, role
    `;
    
    const user = newUser[0];
    
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        phone: user.phone,
        branch: user.branch,
        college: user.college,
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in database
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    if (!user.is_active) {
      return res.status(403).json({ error: 'Account is disabled' });
    }
    
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        phone: user.phone,
        branch: user.branch,
        college: user.college,
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
