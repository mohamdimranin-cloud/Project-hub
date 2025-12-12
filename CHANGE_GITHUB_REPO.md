# Change GitHub Repository

## ✅ What I Did

Changed your Git remote from:
```
https://github.com/MuhammedAman113114/projecthub.git
```

To:
```
https://github.com/mohamdimranin-cloud/Project-hub.git
```

## 🔐 Authentication Required

You need to authenticate with the new GitHub account to push code.

### Option 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not installed
# Download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Follow prompts:
# - Select: GitHub.com
# - Select: HTTPS
# - Authenticate with web browser
# - Login with mohamdimranin-cloud account

# Then push
git push -u origin main
```

### Option 2: Using Personal Access Token

1. **Create Personal Access Token:**
   - Login to GitHub as `mohamdimranin-cloud`
   - Go to: https://github.com/settings/tokens
   - Click **Generate new token** → **Generate new token (classic)**
   - Name: `ProjectHub Deploy`
   - Select scopes: `repo` (all)
   - Click **Generate token**
   - **Copy the token** (you won't see it again!)

2. **Push with Token:**
   ```bash
   git push https://YOUR_TOKEN@github.com/mohamdimranin-cloud/Project-hub.git main
   ```

3. **Or set credential helper:**
   ```bash
   git config credential.helper store
   git push -u origin main
   # Enter username: mohamdimranin-cloud
   # Enter password: YOUR_TOKEN
   ```

### Option 3: Using SSH (Most Secure)

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   # Press Enter for default location
   # Press Enter for no passphrase (or set one)
   ```

2. **Copy SSH Key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```

3. **Add to GitHub:**
   - Login to GitHub as `mohamdimranin-cloud`
   - Go to: https://github.com/settings/keys
   - Click **New SSH key**
   - Paste your key
   - Click **Add SSH key**

4. **Change Remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:mohamdimranin-cloud/Project-hub.git
   git push -u origin main
   ```

---

## 🚀 After Successful Push

### Update Render

1. Go to: https://dashboard.render.com
2. Select your backend service
3. Click **Settings**
4. Under **Repository**, click **Connect a different repo**
5. Select: `mohamdimranin-cloud/Project-hub`
6. Save and redeploy

### Update Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Git**
4. Click **Disconnect** (if needed)
5. Click **Connect Git Repository**
6. Select: `mohamdimranin-cloud/Project-hub`
7. Save

---

## 📝 Quick Commands Summary

```bash
# Check current remote
git remote -v

# Change remote (already done)
git remote set-url origin https://github.com/mohamdimranin-cloud/Project-hub.git

# Push to new repo (after authentication)
git push -u origin main

# If you need to force push
git push -u origin main --force
```

---

## ⚠️ Important Notes

1. Make sure the new repository `mohamdimranin-cloud/Project-hub` exists on GitHub
2. If it doesn't exist, create it first:
   - Go to: https://github.com/new
   - Repository name: `Project-hub`
   - Keep it **Public** (for easier deployment)
   - Don't initialize with README
   - Click **Create repository**

3. Your `.env` file is safe - it's in `.gitignore` and won't be pushed

---

## 🐛 Troubleshooting

**Error: "Permission denied"**
- You're logged in with wrong GitHub account
- Use `gh auth logout` then `gh auth login` with correct account

**Error: "Repository not found"**
- Make sure repository exists at: https://github.com/mohamdimranin-cloud/Project-hub
- Check repository name spelling (case-sensitive)

**Error: "Authentication failed"**
- Token might be expired or invalid
- Generate new token with `repo` permissions

---

## ✅ Verification

After successful push, verify:
```bash
git remote -v
# Should show: mohamdimranin-cloud/Project-hub

git log --oneline -5
# Should show your recent commits
```

Visit: https://github.com/mohamdimranin-cloud/Project-hub
You should see all your code there!
