import express from 'express';
import sql from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await sql`
      SELECT * FROM settings
    `;
    
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    
    res.json(settingsObj);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update FAQs
router.patch('/faqs', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { faqs } = req.body;
    
    await sql`
      INSERT INTO settings (key, value)
      VALUES ('faqs', ${JSON.stringify(faqs)}::jsonb)
      ON CONFLICT (key) 
      DO UPDATE SET value = ${JSON.stringify(faqs)}::jsonb, updated_at = NOW()
    `;
    
    res.json({ message: 'FAQs updated successfully' });
  } catch (error) {
    console.error('Update FAQs error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update contact details
router.patch('/contact', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contactData = req.body;
    
    await sql`
      INSERT INTO settings (key, value)
      VALUES ('contact', ${JSON.stringify(contactData)}::jsonb)
      ON CONFLICT (key) 
      DO UPDATE SET value = ${JSON.stringify(contactData)}::jsonb, updated_at = NOW()
    `;
    
    res.json({ message: 'Contact details updated successfully' });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update pricing
router.patch('/pricing', authenticate, authorize('admin'), async (req, res) => {
  try {
    const pricingData = req.body;
    
    await sql`
      INSERT INTO settings (key, value)
      VALUES ('pricing', ${JSON.stringify(pricingData)}::jsonb)
      ON CONFLICT (key) 
      DO UPDATE SET value = ${JSON.stringify(pricingData)}::jsonb, updated_at = NOW()
    `;
    
    res.json({ message: 'Pricing updated successfully' });
  } catch (error) {
    console.error('Update pricing error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update homepage content
router.patch('/homepage', authenticate, authorize('admin'), async (req, res) => {
  try {
    const homepageData = req.body;
    
    await sql`
      INSERT INTO settings (key, value)
      VALUES ('homepage', ${JSON.stringify(homepageData)}::jsonb)
      ON CONFLICT (key) 
      DO UPDATE SET value = ${JSON.stringify(homepageData)}::jsonb, updated_at = NOW()
    `;
    
    res.json({ message: 'Homepage content updated successfully' });
  } catch (error) {
    console.error('Update homepage error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
