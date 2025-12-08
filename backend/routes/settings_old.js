import express from 'express';
import { settings } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get settings (public)
router.get('/', async (req, res) => {
  try {
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update FAQs (admin only)
router.patch('/faqs', authenticate, authorize('admin'), async (req, res) => {
  try {
    settings.faqs = req.body.faqs;
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update contact details (admin only)
router.patch('/contact', authenticate, authorize('admin'), async (req, res) => {
  try {
    settings.contactDetails = { ...settings.contactDetails, ...req.body };
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update pricing rules (admin only)
router.patch('/pricing', authenticate, authorize('admin'), async (req, res) => {
  try {
    settings.pricingRules = { ...settings.pricingRules, ...req.body };
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update homepage content (admin only)
router.patch('/homepage', authenticate, authorize('admin'), async (req, res) => {
  try {
    settings.homepageContent = { ...settings.homepageContent, ...req.body };
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
