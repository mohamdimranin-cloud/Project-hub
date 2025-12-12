import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false 
  }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: req.user.id, 
          email: req.user.email, 
          role: req.user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Check if profile is completed
      const redirectUrl = req.user.profile_completed 
        ? `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            profile_completed: req.user.profile_completed
          }))}`
        : `${process.env.FRONTEND_URL}/complete-profile?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            profile_completed: req.user.profile_completed
          }))}`;

      // Redirect to frontend
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

export default router;
