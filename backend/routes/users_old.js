import express from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Change password - MUST be before /:id routes
router.patch('/me/password', authenticate, async (req, res) => {
  try {
    console.log('Password change request received');
    const { currentPassword, newPassword } = req.body;
    
    console.log('Request body:', { currentPassword: '***', newPassword: '***' });
    
    if (!currentPassword || !newPassword) {
      console.log('Missing password fields');
      return res.status(400).json({ error: 'Current password and new password are required' });
    }
    
    if (newPassword.length < 6) {
      console.log('Password too short');
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    
    const user = users.find(u => u._id === req.user.userId);
    if (!user) {
      console.log('User not found:', req.user.userId);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('User found:', user.email);
    
    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    console.log('Password updated successfully for user:', user.email);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get current user profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = users.find(u => u._id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user profile
router.patch('/me', authenticate, async (req, res) => {
  try {
    const user = users.find(u => u._id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update allowed fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.branch) user.branch = req.body.branch;
    if (req.body.college) user.college = req.body.college;
    
    // Allow admin to update email
    if (req.body.email && user.role === 'admin') {
      // Check if email is already taken by another user
      const existingUser = users.find(u => u.email === req.body.email && u._id !== user._id);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      user.email = req.body.email;
    }
    
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const safeUsers = users.map(u => {
      const { password, ...safe } = u;
      return safe;
    });
    res.json(safeUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user role (admin only)
router.patch('/:id/role', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.role = req.body.role;
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ban/disable user (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.isActive = req.body.isActive;
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's project history (admin or own user)
router.get('/:id/projects', authenticate, async (req, res) => {
  try {
    if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const { projects } = await import('../data/store.js');
    const userProjects = projects.filter(p => p.requester === req.params.id);
    
    res.json(userProjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
