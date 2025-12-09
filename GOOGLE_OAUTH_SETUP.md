# Google OAuth Setup Guide

## Current Status
✅ UI is ready with "Continue with Google" button
✅ Backend routes are prepared
⏳ Requires Google OAuth 2.0 credentials

## Steps to Enable Google Login:

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - App name: ProjectHub
   - User support email: projecthub.helpdesk@gmail.com
   - Developer contact: projecthub.helpdesk@gmail.com
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins:
     - http://localhost:3000 (development)
     - https://your-domain.com (production)
   - Authorized redirect URIs:
     - http://localhost:5000/api/auth/google/callback (development)
     - https://your-backend-domain.com/api/auth/google/callback (production)

### 2. Install Required Package

```bash
cd backend
npm install passport passport-google-oauth20 express-session
```

### 3. Add Environment Variables

Add to `backend/.env`:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your_random_session_secret
```

### 4. Update Backend Code

The backend routes are already prepared. You'll need to:
1. Configure Passport.js with Google Strategy
2. Add session middleware
3. Implement the OAuth callback handler

### 5. Test

1. Click "Continue with Google" button
2. Authenticate with Google
3. User will be created/logged in automatically

## Alternative: Email-Only Login

The current implementation works perfectly with email login:
- ✅ "Continue with Email" button
- ✅ Secure JWT authentication
- ✅ Full registration flow
- ✅ Password reset via email

Users can use email login immediately while Google OAuth is being set up.

## Security Notes

- Never commit Google credentials to Git
- Use environment variables for all secrets
- Enable HTTPS in production
- Validate OAuth tokens on backend
- Store minimal user data from Google

## Support

For help setting up Google OAuth:
📧 Contact: projecthub.helpdesk@gmail.com
