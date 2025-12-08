import express from 'express';
import bcrypt from 'bcryptjs';
import sql from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const users = await sql`
      SELECT id, email, name, phone, branch, college, role, is_active, created_at
      FROM users 
      WHERE id = ${req.user.userId}
    `;
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = users[0];
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      branch: user.branch,
      college: user.college,
      role: user.role,
      isActive: user.is_active,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update current user
router.patch('/me', authenticate, async (req, res) => {
  try {
    const { name, phone, branch, college } = req.body;
    
    const updated = await sql`
      UPDATE users 
      SET name = ${name}, 
          phone = ${phone || ''}, 
          branch = ${branch || ''}, 
          college = ${college || ''}
      WHERE id = ${req.user.userId}
      RETURNING id, email, name, phone, branch, college, role, is_active
    `;
    
    if (updated.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = updated[0];
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      branch: user.branch,
      college: user.college,
      role: user.role,
      isActive: user.is_active
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Change password
router.patch('/me/password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    
    const users = await sql`
      SELECT * FROM users WHERE id = ${req.user.userId}
    `;
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = users[0];
    
    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${req.user.userId}
    `;
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.query;
    
    let users;
    if (role && role !== 'all') {
      users = await sql`
        SELECT id, email, name, phone, branch, college, role, is_active, created_at
        FROM users 
        WHERE role = ${role}
        ORDER BY created_at DESC
      `;
    } else {
      users = await sql`
        SELECT id, email, name, phone, branch, college, role, is_active, created_at
        FROM users 
        ORDER BY created_at DESC
      `;
    }
    
    const formattedUsers = users.map(u => ({
      _id: u.id.toString(),
      email: u.email,
      name: u.name,
      phone: u.phone,
      branch: u.branch,
      college: u.college,
      role: u.role,
      isActive: u.is_active,
      createdAt: u.created_at
    }));
    
    res.json(formattedUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const users = await sql`
      SELECT id, email, name, phone, branch, college, role, is_active, created_at
      FROM users 
      WHERE id = ${req.params.id}
    `;
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = users[0];
    res.json({
      _id: user.id.toString(),
      email: user.email,
      name: user.name,
      phone: user.phone,
      branch: user.branch,
      college: user.college,
      role: user.role,
      isActive: user.is_active,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update user status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { isActive } = req.body;
    
    await sql`
      UPDATE users 
      SET is_active = ${isActive}
      WHERE id = ${req.params.id}
    `;
    
    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user projects (admin only)
router.get('/:id/projects', authenticate, authorize('admin'), async (req, res) => {
  try {
    const projects = await sql`
      SELECT * FROM projects 
      WHERE requester_id = ${req.params.id}
      ORDER BY created_at DESC
    `;
    
    const formattedProjects = projects.map(p => ({
      _id: p.id.toString(),
      title: p.title,
      description: p.description,
      category: p.category,
      projectType: p.project_type,
      budget: parseFloat(p.budget),
      deadline: p.deadline,
      status: p.status,
      createdAt: p.created_at
    }));
    
    res.json(formattedProjects);
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
