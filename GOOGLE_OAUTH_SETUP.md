# Google OAuth Setup Guide

## ✅ What's Already Done

1. ✅ Database migration completed (google_id column added)
2. ✅ Passport.js configuration created
3. ✅ Google OAuth routes integrated in `/api/auth`
4. ✅ Frontend login button added
5. ✅ Required npm packages installed

## 🔧 What You Need to Do

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**

5. **Configure OAuth Consent Screen** (if not done):
   - User Type: **External**
   - App name: **ProjectHub**
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Scopes: Add `email` and `profile` (should be default)
   - Test users: Add your email for testing
   - Click **Save and Continue**

6. **Create OAuth Client ID**:
   - Application type: **Web application**
   - Name: **ProjectHub**
   
   - **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     https://projecthub-psi.vercel.app
     ```
   
   - **Authorized redirect URIs**:
     ```
     http://localhost:5000/api/auth/google/callback
     https://your-backend-domain.vercel.app/api/auth/google/callback
     ```
   
7. Click **Create** and copy:
   - **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
   - **Client Secret** (looks like: `GOCSPX-xxxxx`)

### Step 2: Update Backend Environment Variables

Edit `backend/.env` and replace the placeholder values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Step 3: Update Production Environment Variables

When deploying to production (Vercel/Render/etc.), add these environment variables:

```env
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret
GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 4: Test Locally

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start your frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Go to `http://localhost:3000/login`
4. Click **Continue with Google**
5. Sign in with your Google account
6. You should be redirected back and logged in!

## 🔍 How It Works

1. User clicks "Continue with Google" button
2. Frontend redirects to: `http://localhost:5000/api/auth/google`
3. Backend redirects to Google's OAuth consent screen
4. User approves and Google redirects to: `http://localhost:5000/api/auth/google/callback`
5. Backend:
   - Receives user profile from Google
   - Checks if user exists (by google_id or email)
   - Creates new user or links Google account to existing user
   - Generates JWT token
6. Backend redirects to: `http://localhost:3000/auth/callback?token=xxx&user=xxx`
7. Frontend AuthCallback component:
   - Extracts token and user data from URL
   - Saves to localStorage
   - Redirects to dashboard

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches your callback URL
- Check for trailing slashes
- Verify HTTP vs HTTPS

### Error: "Access blocked: This app's request is invalid"
- Configure OAuth consent screen properly
- Add your email as a test user
- Make sure app is not in production mode (use testing mode)

### User created but missing profile info
- Google OAuth users won't have phone, branch, or college initially
- They can update this in their profile settings later

### Database errors
- Make sure the migration ran successfully
- Check that `google_id` column exists in users table
- Verify `password` column is nullable

## 📝 Database Schema

The migration added:
```sql
-- Column for storing Google user ID
google_id VARCHAR(255) UNIQUE

-- Password is now optional (for Google OAuth users)
password VARCHAR(255) NULL

-- Index for faster lookups
CREATE INDEX idx_users_google_id ON users(google_id)
```

## 🚀 Production Deployment

### Vercel (Frontend)
Add environment variable:
```
REACT_APP_API_URL=https://your-backend-domain.com
```

### Vercel/Render (Backend)
Add environment variables:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback
FRONTEND_URL=https://your-frontend-domain.com
```

### Update Google Console
Add production URLs to:
- Authorized JavaScript origins
- Authorized redirect URIs

## ✨ Features

- ✅ One-click Google sign-in
- ✅ Automatic account creation
- ✅ Link Google to existing email accounts
- ✅ Secure JWT token generation
- ✅ Profile data from Google (name, email)
- ✅ Works alongside traditional email/password login

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify all environment variables are set
4. Ensure Google OAuth credentials are correct
5. Check that redirect URIs match exactly
