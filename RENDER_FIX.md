# 🔧 Fix Render Environment Variables Issue

## The Problem
Render is not reading the `DATABASE_URL` environment variable, causing the deployment to fail.

## ✅ Solution: Add Variables During Service Creation

Instead of adding variables after creating the service, let's **delete and recreate** the service with variables from the start.

---

## 📋 Step-by-Step Fix:

### Step 1: Delete Current Service

1. Go to https://dashboard.render.com
2. Click on your `projecthub-backend` service
3. Click **"Settings"** tab (bottom of left sidebar)
4. Scroll to bottom
5. Click **"Delete Web Service"**
6. Type the service name to confirm
7. Click **"Delete"**

---

### Step 2: Create New Service with Variables

1. Click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Select: `MuhammedAman113114/projecthub`
   - Click **"Connect"**

3. **Configure Service:**
   ```
   Name: projecthub-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **IMPORTANT: Click "Advanced" Button**
   - This expands the advanced settings
   - You'll see "Environment Variables" section

5. **Add Environment Variables (Before Deploying!):**

   Click **"Add Environment Variable"** and add these 4 variables:

   **Variable 1:**
   ```
   Key: DATABASE_URL
   Value: postgresql://neondb_owner:npg_bPt7oqliMK4D@ep-restless-truth-a1ywksx8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

   **Variable 2:**
   ```
   Key: JWT_SECRET
   Value: projecthub-super-secret-jwt-key-2024-production
   ```

   **Variable 3:**
   ```
   Key: NODE_ENV
   Value: production
   ```

   **Variable 4:**
   ```
   Key: FRONTEND_URL
   Value: http://localhost:3000
   ```

6. **Create Web Service:**
   - After adding all 4 variables
   - Click **"Create Web Service"** button
   - Render will start building and deploying

---

## ✅ Expected Success Output:

In the logs, you should see:
```
==> Running 'npm start'
> projecthub-backend@1.0.0 start
> node server.js

✅ DATABASE_URL is set
🚀 Server running on port 10000
📊 Using Neon PostgreSQL database
✅ Database connected successfully: 2024-12-07T...
```

---

## 🎯 Alternative: Use render.yaml

If the above doesn't work, we can use a `render.yaml` file to define environment variables.

### Update render.yaml:

The file already exists at `backend/render.yaml`. Let's update it:

```yaml
services:
  - type: web
    name: projecthub-backend
    env: node
    region: singapore
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true
      - key: DATABASE_URL
        sync: false
      - key: FRONTEND_URL
        value: http://localhost:3000
```

Then in Render:
1. Go to "Environment" tab
2. Add only `DATABASE_URL` manually
3. Other variables will be auto-generated

---

## 🔍 Debugging: Check What Variables Are Set

After the new deployment, check the logs. You should see:
```
✅ DATABASE_URL is set
```

If you see:
```
❌ DATABASE_URL environment variable is not set!
Available environment variables: PATH, NODE_VERSION, ...
```

This means the variable wasn't added correctly.

---

## 💡 Pro Tip: Use Render Blueprint

1. In your GitHub repo, move `backend/render.yaml` to root:
   ```
   projecthub/
   ├── render.yaml  ← Move here
   ├── backend/
   └── frontend/
   ```

2. Update the file to point to backend directory

3. In Render, use "Blueprint" instead of "Web Service"

---

## 🆘 If Still Not Working:

### Option 1: Contact Render Support
- Go to https://render.com/docs/support
- Explain: "Environment variables not being read in Node.js app"

### Option 2: Use Different Deployment
- Try Railway: https://railway.app (similar to Render)
- Try Fly.io: https://fly.io
- Try Heroku: https://heroku.com

### Option 3: Hardcode for Testing (NOT RECOMMENDED FOR PRODUCTION)
Temporarily hardcode the DATABASE_URL in `backend/config/database.js`:
```javascript
const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_bPt7oqliMK4D@ep-restless-truth-a1ywksx8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);
```

**⚠️ Warning:** Remove this before pushing to production!

---

## ✅ Checklist:

- [ ] Deleted old service
- [ ] Created new service
- [ ] Clicked "Advanced" before creating
- [ ] Added all 4 environment variables
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment
- [ ] Checked logs for success message
- [ ] Service is running

---

**Try the delete and recreate approach first. It usually fixes the issue!** 🚀
