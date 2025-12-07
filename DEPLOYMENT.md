# ProjectHub Deployment Guide

## 🚀 Deployment Stack
- **Frontend**: Vercel
- **Backend**: Render
- **Code Repository**: GitHub

---

## 📋 Prerequisites

1. GitHub account
2. Vercel account (sign up at vercel.com)
3. Render account (sign up at render.com)
4. Git installed on your machine

---

## 🔧 Step 1: Push Code to GitHub

### Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - ProjectHub"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `projecthub`
3. Don't initialize with README (we already have code)

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/projecthub.git
git branch -M main
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import GitHub Repository**
   - Select your `projecthub` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
   - (You'll update this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your Vercel URL: `https://your-app.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

---

## 🖥️ Step 3: Deploy Backend to Render

### Using Render Dashboard

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New" → "Web Service"

2. **Connect GitHub Repository**
   - Select your `projecthub` repository
   - Click "Connect"

3. **Configure Web Service**
   - **Name**: `projecthub-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   Click "Environment" and add:
   ```
   NODE_ENV=production
   JWT_SECRET=87dc7b0ab81348df939799f0a4032bd0
   FRONTEND_URL=https://your-app.vercel.app
   PORT=10000
   ```

   **Generate JWT_SECRET**: Use this command to generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Select Plan**
   - Choose "Free" plan to start
   - Click "Create Web Service"

6. **Wait for Deployment**
   - Render will build and deploy your backend
   - Note your Render URL: `https://projecthub-backend.onrender.com`

---

## 🔗 Step 4: Connect Frontend to Backend

### Update Frontend Environment Variable

1. **Go to Vercel Dashboard**
   - Select your project
   - Go to "Settings" → "Environment Variables"

2. **Update API URL**
   - Edit `REACT_APP_API_URL`
   - Set value to: `https://projecthub-backend.onrender.com/api`
   - Click "Save"

3. **Redeploy Frontend**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## 🔒 Step 5: Update Backend CORS

The backend is already configured to use `FRONTEND_URL` environment variable.
Make sure it's set correctly in Render:

```
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Step 6: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app`
2. **Test Login**:
   - Student: `student@test.com` / `password123`
   - Admin: `admin@test.com` / `password123`
3. **Test Features**:
   - Create a project
   - Update status
   - View notifications

---

## 🔄 Continuous Deployment

Both Vercel and Render are now set up for automatic deployments:

- **Push to GitHub** → Automatically deploys to both platforms
- **Frontend**: Vercel rebuilds on every push
- **Backend**: Render rebuilds on every push

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Both services will automatically deploy!
```

---

## 📊 Monitoring & Logs

### Vercel Logs
- Dashboard → Your Project → Deployments → View Logs

### Render Logs
- Dashboard → Your Service → Logs tab

---

## 🐛 Troubleshooting

### Frontend can't connect to Backend
- Check `REACT_APP_API_URL` in Vercel environment variables
- Verify backend is running on Render
- Check CORS settings in backend

### Backend CORS errors
- Verify `FRONTEND_URL` in Render environment variables
- Make sure it matches your Vercel URL exactly

### Build failures
- Check build logs in respective dashboards
- Verify all dependencies are in package.json
- Check Node version compatibility

---

## 🎯 Production Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] CORS properly set up
- [ ] Test login functionality
- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Monitor logs for errors

---

## 🔐 Security Notes

1. **Never commit `.env` files** - They're in .gitignore
2. **Use strong JWT_SECRET** - Generate with crypto
3. **Keep dependencies updated** - Run `npm audit fix`
4. **Monitor logs regularly** - Check for suspicious activity

---

## 📈 Scaling (Future)

When you need to scale:

1. **Database**: Add MongoDB Atlas
2. **File Storage**: Add AWS S3 or Cloudinary
3. **Email**: Add SendGrid or Mailgun
4. **Caching**: Add Redis
5. **CDN**: Vercel includes CDN for frontend

---

## 💰 Cost Estimate

- **Vercel**: Free tier (Hobby plan)
- **Render**: Free tier (with limitations)
- **GitHub**: Free for public repos

**Total**: $0/month to start! 🎉

Upgrade when needed:
- Vercel Pro: $20/month
- Render Starter: $7/month

---

## 🆘 Support

If you encounter issues:
1. Check logs in Vercel/Render dashboards
2. Review this guide
3. Check GitHub Issues
4. Contact support

---

## 🎉 You're Done!

Your ProjectHub is now live and accessible worldwide! 🌍

**Frontend**: https://your-app.vercel.app
**Backend**: https://projecthub-backend.onrender.com

Share your app and start managing projects! 🚀
