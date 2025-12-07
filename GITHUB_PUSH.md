# 📤 Push to GitHub Guide

## Quick Steps to Push Your Code

### 1️⃣ Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `projecthub`
3. **Description**: Student Project Management System
4. **Visibility**: Public or Private (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2️⃣ Push Your Code

Copy and run these commands in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/projecthub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Example:
```bash
git remote add origin https://github.com/johndoe/projecthub.git
git branch -M main
git push -u origin main
```

### 3️⃣ Enter Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: Use Personal Access Token (not your password)

#### How to Create Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "ProjectHub Deploy"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## ✅ Verify Push

After pushing, verify on GitHub:
1. Go to your repository URL
2. You should see all your files
3. Check that `.env` files are NOT visible (they're in .gitignore)

---

## 🔄 Future Updates

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🚀 Next Steps

After pushing to GitHub:

1. **Deploy Frontend to Vercel**
   - See DEPLOYMENT.md

2. **Deploy Backend to Render**
   - See DEPLOYMENT.md

3. **Setup Neon Database**
   - See NEON_SETUP.md

---

## 🐛 Troubleshooting

### Error: remote origin already exists
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/projecthub.git
```

### Error: failed to push
```bash
git pull origin main --rebase
git push origin main
```

### Error: authentication failed
- Make sure you're using Personal Access Token, not password
- Generate new token if needed

---

## 📝 Git Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# View remotes
git remote -v

# Pull latest changes
git pull origin main
```

---

## ✨ You're Done!

Your code is now on GitHub! 🎉

Repository URL: `https://github.com/YOUR_USERNAME/projecthub`
