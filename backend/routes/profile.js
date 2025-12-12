import express from 'express';
import sql from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Complete user profile
router.post('/complete', authenticateToken, async (req, res) => {
  try {
    const { name, college, branch, phone } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name || !college || !branch || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, college, branch, and phone'
      });
    }

    // Validate phone number format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }

    // Update user profile
    const updatedUser = await sql`
      UPDATE users 
      SET 
        name = ${name.trim()},
        college = ${college.trim()},
        branch = ${branch.trim()},
        phone = ${phone.trim()},
        profile_completed = true,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING id, email, name, college, branch, phone, role, profile_completed, created_at
    `;

    if (updatedUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile completed successfully',
      user: updatedUser[0]
    });

  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete profile'
    });
  }
});

// Get user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await sql`
      SELECT id, email, name, college, branch, phone, role, profile_completed, created_at
      FROM users 
      WHERE id = ${userId}
    `;

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
});

// Update user profile
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { name, college, branch, phone } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name || !college || !branch || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, college, branch, and phone'
      });
    }

    // Validate phone number format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number'
      });
    }

    // Update user profile
    const updatedUser = await sql`
      UPDATE users 
      SET 
        name = ${name.trim()},
        college = ${college.trim()},
        branch = ${branch.trim()},
        phone = ${phone.trim()},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING id, email, name, college, branch, phone, role, profile_completed, created_at
    `;

    if (updatedUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser[0]
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

export default router;