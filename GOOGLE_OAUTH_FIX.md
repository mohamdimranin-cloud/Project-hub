# 🔧 Fix Google OAuth "redirect_uri_mismatch" Error

## ❌ Current Problem
```
Access blocked: This app's request is invalid
Error 400: redirect_uri_mismatch
```

## ✅ Solution: Add Production URLs to Google Console

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/apis/credentials

### Step 2: Click Your OAuth 2.0 Client ID
Client ID: `400024808958-pucls4dgvis42i7iaanpsb2jprmm30pu`

### Step 3: Add Authorized Redirect URIs
Add ALL of these URLs:
```
http://localhost:5000/api/auth/google/callback
https://projecthub-backend-y0a8.onrender.com/api/auth/google/callback
```

### Step 4: Add Authorized JavaScript Origins
Add ALL of these URLs:
```
http://localhost:3000
https://projecthub-psi.vercel.app
```

### Step 5: Click SAVE
⚠️ **Wait 5-10 minutes** for Google to update the settings.

---

## 🔄 Update Production Environment Variables

### Render Backend Environment Variables

Go to: https://dashboard.render.com

1. Select your `projecthub-backend` service
2. Click **Environment** tab
3. Update/Add these variables:

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=projecthub-super-secret-jwt-key-2024-change-in-production
FRONTEND_URL=https://projecthub-psi.vercel.app
DATABASE_URL=postgresql://neondb_owner:npg_bPt7oqliMK4D@ep-restless-truth-a1ywksx8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://projecthub-backend-y0a8.onrender.com/api/auth/google/callback
```

4. Click **Save Changes**
5. Wait for automatic redeploy (2-3 minutes)

### Vercel Frontend Environment Variables

Go to: https://vercel.com/dashboard

1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Make sure you have:
```
REACT_APP_API_URL=https://projecthub-backend-y0a8.onrender.com/api
```

---

## 🧪 Test the Fix

### After 10 minutes:

1. **Visit your app**: https://projecthub-psi.vercel.app
2. **Click "Continue with Google"**
3. **Should redirect to Google login** ✅
4. **After login, should redirect back to your app** ✅

---

## 🐛 If Still Not Working

### Check the Exact Error URL
1. Open browser developer tools (F12)
2. Go to Network tab
3. Click "Continue with Google"
4. Look at the failed request
5. Copy the exact redirect_uri from the error
6. Add that EXACT URL to Google Console

### Common Issues:
- **Trailing slash**: `callback/` vs `callback`
- **HTTP vs HTTPS**: Make sure you're using HTTPS for production
- **Case sensitivity**: URLs must match exactly
- **Timing**: Google takes 5-10 minutes to update

---

## ✅ Your Current URLs

**Frontend**: https://projecthub-psi.vercel.app
**Backend**: https://projecthub-backend-y0a8.onrender.com
**Google Callback**: https://projecthub-backend-y0a8.onrender.com/api/auth/google/callback

---

## 🎉 Once Fixed

Your Google OAuth will work in production and users can sign in with their Google accounts! 

The error happens because Google is very strict about redirect URIs for security reasons. Once you add the production URLs, it should work perfectly.