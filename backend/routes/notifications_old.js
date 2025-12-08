import express from 'express';
import { notifications } from '../data/store.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const userNotifications = notifications
      .filter(n => n.userId === req.user.userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    
    res.json(userNotifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const notification = notifications.find(n => n._id === req.params.id);
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    if (notification.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    notification.read = true;
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark all as read
router.patch('/read-all', authenticate, async (req, res) => {
  try {
    notifications
      .filter(n => n.userId === req.user.userId)
      .forEach(n => n.read = true);
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
