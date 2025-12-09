# Google OAuth Production Setup

## 🌐 Add Production URLs to Google Console

### Step 1: Go to Google Cloud Console

Visit: https://console.cloud.google.com/apis/credentials

### Step 2: Click on Your OAuth 2.0 Client ID

Client ID: `400024808958-pucls4dgvis42i7iaanpsb2jprmm30pu`

### Step 3: Add Authorized Redirect URIs

Add ALL of these URLs:

```
http://localhost:5000/api/auth/google/callback
https://projecthub-backend.onrender.com/api/auth/google/callback
https://your-actual-backend-url.onrender.com/api/auth/google/callback
```

**Replace `your-actual-backend-url` with your real Render backend URL**

### Step 4: Add Authorized JavaScript Origins

Add ALL of these URLs:

```
http://localhost:3000
https://projecthub-psi.vercel.app
https://your-actual-frontend-url.vercel.app
```

**Replace `your-actual-frontend-url` with your real Vercel frontend URL**

### Step 5: Click SAVE

---

## 🔧 Update Production Environment Variables

### Vercel (Frontend)

Go to: https://vercel.com/dashboard

1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Add/Update:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

### Render (Backend)

Go to: https://dashboard.render.com

1. Select your backend service
2. Go to **Environment** tab
3. Add these variables:

```env
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret-here
FRONTEND_URL=https://your-frontend-url.vercel.app
DATABASE_URL=your-database-url-from-local-env

# Google OAuth (copy from local .env)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
```

4. Click **Save Changes**
5. Backend will automatically redeploy

---

## 📝 Quick Reference

### Your Google OAuth Credentials

Your credentials are stored in `backend/.env`:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET  
- Project ID: projecthub-480717

Copy these values from your local `.env` file when setting up production.

---

## ✅ Testing Checklist

### Local Testing (Development)
- [ ] Added `http://localhost:5000/api/auth/google/callback` to Google Console
- [ ] Added `http://localhost:3000` to Google Console
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Click "Continue with Google" works

### Production Testing
- [ ] Added production backend URL to Google Console redirect URIs
- [ ] Added production frontend URL to Google Console JavaScript origins
- [ ] Environment variables set in Render
- [ ] Environment variables set in Vercel
- [ ] Both services redeployed
- [ ] Visit production URL and test Google login

---

## 🐛 Common Issues

### "redirect_uri_mismatch" Error

**Problem:** The redirect URI doesn't match what's in Google Console

**Solution:**
1. Check the exact URL in the error message
2. Add that EXACT URL to Google Console (including http/https, trailing slashes, etc.)
3. Wait 5 minutes for Google to update
4. Try again

### "Access blocked: This app's request is invalid"

**Problem:** OAuth consent screen not configured or app not published

**Solution:**
1. Go to Google Console → OAuth consent screen
2. Make sure app is in "Testing" mode
3. Add your email as a test user
4. Or publish the app (requires verification)

### User logs in but gets error

**Problem:** Backend environment variables not set

**Solution:**
1. Check Render environment variables
2. Make sure all Google OAuth variables are set
3. Redeploy backend service
4. Check backend logs for errors

---

## 🔐 Security Best Practices

1. **Never commit credentials** - Keep them in environment variables only
2. **Use different credentials** for development and production (optional but recommended)
3. **Rotate secrets regularly** - Change Client Secret periodically
4. **Monitor OAuth usage** - Check Google Console for suspicious activity
5. **Limit scopes** - Only request email and profile (already configured)

---

## 📊 OAuth Consent Screen Settings

Make sure your OAuth consent screen is configured:

1. **App name:** ProjectHub
2. **User support email:** Your email
3. **App logo:** (Optional) Upload your logo
4. **App domain:** Your Vercel domain
5. **Authorized domains:** 
   - `vercel.app`
   - `onrender.com`
6. **Developer contact:** Your email
7. **Scopes:** 
   - `email`
   - `profile`
8. **Test users:** Add emails that can test the app

---

## 🚀 Going Live (Publishing Your App)

When ready for public use:

1. **Complete OAuth consent screen** with all required information
2. **Submit for verification** (if needed)
3. **Change from Testing to Production** mode
4. **Remove test user restrictions**

**Note:** Verification can take several days. Keep app in Testing mode until approved.

---

## 📞 Need Help?

- Google OAuth Documentation: https://developers.google.com/identity/protocols/oauth2
- Google Console: https://console.cloud.google.com
- Check backend logs in Render
- Check frontend logs in Vercel

---

## ✨ You're All Set!

Once you've added the production URLs to Google Console and updated environment variables, your Google login will work in production! 🎉
