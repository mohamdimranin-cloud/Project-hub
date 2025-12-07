# 🐘 Neon PostgreSQL Setup Guide

This guide will help you set up Neon PostgreSQL database for ProjectHub.

## 📋 What is Neon?

Neon is a serverless PostgreSQL database that offers:
- ✅ Free tier with 0.5 GB storage
- ✅ Automatic scaling
- ✅ Instant database branching
- ✅ No cold starts
- ✅ Built-in connection pooling

---

## 🚀 Step 1: Create Neon Account

1. Go to https://neon.tech
2. Click "Sign Up" (use GitHub for easy signup)
3. Verify your email

---

## 🗄️ Step 2: Create a New Project

1. **Click "Create Project"**
2. **Configure Project:**
   - **Project Name**: `projecthub`
   - **Database Name**: `projecthub`
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: 16 (latest)

3. **Click "Create Project"**

---

## 🔑 Step 3: Get Connection String

After creating the project, you'll see your connection details:

```
Connection String:
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/projecthub?sslmode=require
```

**Copy this connection string!** You'll need it for the next steps.

---

## ⚙️ Step 4: Configure Backend

### Local Development

1. **Create `.env` file in backend folder:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:3000
   DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/projecthub?sslmode=require
   ```

3. **Replace `DATABASE_URL` with your Neon connection string**

---

## 🏗️ Step 5: Initialize Database

Run the initialization script to create tables and seed data:

```bash
cd backend
npm run init-db
```

This will:
- ✅ Create all necessary tables
- ✅ Set up indexes for performance
- ✅ Create default admin and student accounts
- ✅ Insert default settings

**Expected Output:**
```
🔄 Initializing database...
✅ Database initialized successfully!
📝 Default accounts created:
   Admin: admin@test.com / password123
   Student: student@test.com / password123
```

---

## 🧪 Step 6: Test Connection

Start your backend server:

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📊 Using Neon PostgreSQL database
✅ Database connected successfully: 2024-12-07T...
```

---

## 🌐 Step 7: Deploy to Render

### Add Environment Variable

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add new environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your Neon connection string
5. Click "Save Changes"

### Initialize Production Database

After deploying to Render:

1. Go to Render dashboard → Your service
2. Click "Shell" tab
3. Run: `npm run init-db`

Or use Render's deploy hook to run it automatically.

---

## 📊 Step 8: Verify Database

### Using Neon Console

1. Go to https://console.neon.tech
2. Select your project
3. Click "SQL Editor"
4. Run queries to verify:

```sql
-- Check users
SELECT * FROM users;

-- Check projects
SELECT * FROM projects;

-- Check settings
SELECT * FROM settings;
```

### Using psql (Optional)

```bash
psql "postgresql://username:password@ep-xxx.region.aws.neon.tech/projecthub?sslmode=require"
```

---

## 🔄 Database Migration (Future Updates)

When you need to update the schema:

1. **Create migration file**: `backend/migrations/001_add_feature.sql`
2. **Write SQL changes**
3. **Run migration**: Execute SQL in Neon console or via script

---

## 📈 Monitoring & Management

### Neon Dashboard Features

- **Metrics**: View database performance
- **Queries**: Monitor slow queries
- **Branches**: Create database branches for testing
- **Backups**: Automatic point-in-time recovery

### Access Dashboard

1. Go to https://console.neon.tech
2. Select your project
3. View metrics and logs

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`

2. **Use strong passwords**
   - Neon generates secure passwords automatically

3. **Rotate credentials regularly**
   - Update in Neon console and environment variables

4. **Use connection pooling**
   - Neon includes this by default

5. **Enable SSL**
   - Always use `?sslmode=require` in connection string

---

## 💰 Pricing & Limits

### Free Tier Includes:
- 0.5 GB storage
- 1 project
- Unlimited databases
- Unlimited queries
- Community support

### Upgrade When Needed:
- **Launch**: $19/month (3 GB storage)
- **Scale**: $69/month (10 GB storage)
- **Business**: Custom pricing

---

## 🐛 Troubleshooting

### Connection Timeout
```
Error: connect ETIMEDOUT
```
**Solution**: Check your internet connection and firewall settings

### Authentication Failed
```
Error: password authentication failed
```
**Solution**: Verify your connection string is correct

### SSL Required
```
Error: SSL connection required
```
**Solution**: Add `?sslmode=require` to connection string

### Database Not Found
```
Error: database "projecthub" does not exist
```
**Solution**: Create database in Neon console

---

## 📚 Useful Commands

```bash
# Initialize database
npm run init-db

# Start development server
npm run dev

# Check database connection
node -e "import('./config/database.js').then(m => m.testConnection())"
```

---

## 🔗 Useful Links

- **Neon Console**: https://console.neon.tech
- **Neon Docs**: https://neon.tech/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Support**: https://neon.tech/docs/introduction/support

---

## ✅ Checklist

Before deploying to production:

- [ ] Neon project created
- [ ] Connection string obtained
- [ ] Backend `.env` configured
- [ ] Database initialized locally
- [ ] Tables created successfully
- [ ] Default users created
- [ ] Connection tested
- [ ] Render environment variables set
- [ ] Production database initialized
- [ ] Application tested end-to-end

---

## 🎉 You're Done!

Your ProjectHub is now using Neon PostgreSQL! 🐘

**Benefits:**
- ✅ Persistent data storage
- ✅ Scalable database
- ✅ Automatic backups
- ✅ Production-ready
- ✅ Free to start

Enjoy your serverless PostgreSQL database! 🚀
