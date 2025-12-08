import express from 'express';
import sql from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const notifications = await sql`
      SELECT * FROM notifications
      WHERE user_id = ${req.user.userId}
      ORDER BY created_at DESC
    `;
    
    const formattedNotifications = notifications.map(n => ({
      _id: n.id.toString(),
      userId: n.user_id,
      message: n.message,
      type: n.type,
      relatedProjectId: n.related_project_id,
      read: n.is_read,
      createdAt: n.created_at
    }));
    
    res.json(formattedNotifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const notifications = await sql`
      SELECT * FROM notifications WHERE id = ${req.params.id}
    `;
    
    if (notifications.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    if (notifications[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await sql`
      UPDATE notifications 
      SET is_read = true
      WHERE id = ${req.params.id}
    `;
    
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Mark all as read
router.patch('/read-all', authenticate, async (req, res) => {
  try {
    await sql`
      UPDATE notifications 
      SET is_read = true
      WHERE user_id = ${req.user.userId}
    `;
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
