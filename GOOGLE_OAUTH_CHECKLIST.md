# Google OAuth Setup Checklist

## ✅ For Local Development (Testing)

### 1. Google Console Configuration

Go to: https://console.cloud.google.com/apis/credentials

**Authorized redirect URIs:**
```
http://localhost:5000/api/auth/google/callback
```

**Authorized JavaScript origins:**
```
http://localhost:3000
```

### 2. Test Locally

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit: http://localhost:3000/login
Click: "Continue with Google"

---

## 🌐 For Production Deployment

### 1. Get Your Deployed URLs

**Frontend (Vercel):**
- Example: `https://projecthub-psi.vercel.app`
- Find at: https://vercel.com/dashboard

**Backend (Render):**
- Example: `https://projecthub-backend.onrender.com`
- Find at: https://dashboard.render.com

### 2. Add Production URLs to Google Console

Go to: https://console.cloud.google.com/apis/credentials

**Authorized redirect URIs (add both):**
```
http://localhost:5000/api/auth/google/callback
https://YOUR-BACKEND-URL.onrender.com/api/auth/google/callback
```

**Authorized JavaScript origins (add both):**
```
http://localhost:3000
https://YOUR-FRONTEND-URL.vercel.app
```

### 3. Update Render Environment Variables

Go to: https://dashboard.render.com → Your Service → Environment

Add these (copy values from your local `backend/.env`):
```env
GOOGLE_CLIENT_ID=your-client-id-from-local-env
GOOGLE_CLIENT_SECRET=your-client-secret-from-local-env
GOOGLE_CALLBACK_URL=https://YOUR-BACKEND-URL.onrender.com/api/auth/google/callback
FRONTEND_URL=https://YOUR-FRONTEND-URL.vercel.app
```

Click **Save** (backend will auto-redeploy)

### 4. Test Production

Visit your production URL and click "Continue with Google"

---

## 🎯 Quick Summary

**What you need:**
1. ✅ Google OAuth credentials (already have them)
2. ✅ Local setup (already done)
3. ⏳ Add production URLs to Google Console
4. ⏳ Add environment variables to Render

**Time needed:** 5-10 minutes

---

## 📝 Your Credentials

Your Google OAuth credentials are stored securely in `backend/.env`:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

**Never share these or commit them to Git!**

---

## ❓ Questions?

- Local not working? Check `GOOGLE_OAUTH_SETUP.md`
- Production not working? Check `GOOGLE_OAUTH_PRODUCTION_SETUP.md`
- Still stuck? Check the troubleshooting sections in those files
