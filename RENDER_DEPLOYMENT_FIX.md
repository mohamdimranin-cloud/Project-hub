# Fix Render Deployment Issues

## Problem 1: Private Repository Access

Render can't clone your private GitHub repository.

### Solution A: Make Repository Public (Recommended for learning projects)

1. Go to: https://github.com/MuhammedAman113114/projecthub
2. Click **Settings** (repository settings, not your account)
3. Scroll down to **Danger Zone**
4. Click **Change visibility**
5. Select **Make public**
6. Type the repository name to confirm
7. Click **I understand, change repository visibility**

Then go back to Render and click **Manual Deploy** → **Deploy latest commit**

### Solution B: Connect GitHub Account to Render (For private repos)

1. Go to Render Dashboard: https://dashboard.render.com
2. Click your profile icon → **Account Settings**
3. Go to **GitHub** section
4. Click **Connect GitHub Account** or **Reconnect**
5. Authorize Render to access your repositories
6. Select **All repositories** or choose specific ones
7. Go back to your service and redeploy

---

## Problem 2: Wrong Root Directory

The error shows Render is looking in `/opt/render/project/src/backend/` but your structure is different.

### Fix Root Directory Setting

1. Go to Render Dashboard
2. Select your backend service
3. Click **Settings**
4. Find **Root Directory**
5. Change from `backend` to `.` (dot) or leave empty
6. Update **Build Command** to: `cd backend && npm install`
7. Update **Start Command** to: `cd backend && npm start`
8. Click **Save Changes**

OR keep Root Directory as `backend` but make sure your repo structure is:
```
projecthub/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ...
└── frontend/
    └── ...
```

---

## Quick Fix Steps

### Step 1: Make Repo Public
```
GitHub → Your Repo → Settings → Danger Zone → Change visibility → Make public
```

### Step 2: Update Render Settings

**Root Directory:** `backend`

**Build Command:** `npm install`

**Start Command:** `npm start`

**Environment Variables:**
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

### Step 3: Manual Deploy

Click **Manual Deploy** → **Deploy latest commit**

---

## Alternative: Use Vercel for Backend Too

If Render keeps having issues, you can deploy backend to Vercel:

1. Go to Vercel Dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Output Directory:** (leave empty)
5. Add all environment variables
6. Deploy

Vercel works great with Node.js backends!

---

## Check Your Repository Structure

Make sure your repo looks like this:

```
projecthub/
├── backend/
│   ├── package.json          ← Must exist
│   ├── server.js
│   ├── config/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
├── .gitignore
└── README.md
```

Run this to verify:
```bash
ls -la
ls -la backend/
```

---

## Still Having Issues?

1. Check Render logs for exact error
2. Verify package.json exists in backend folder
3. Make sure .gitignore isn't excluding important files
4. Try deploying to Vercel instead
