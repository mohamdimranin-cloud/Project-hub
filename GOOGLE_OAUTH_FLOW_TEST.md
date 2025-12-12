# 🧪 Google OAuth Profile Completion Flow Test

## 🎯 Expected Flow

### For New Google Users:
1. **Click "Continue with Google"** → `/api/auth/google`
2. **Google Authentication** → User authenticates with Google
3. **Backend creates user** with `profile_completed = false`
4. **Redirect to profile form** → `/complete-profile?token=...&user=...`
5. **User fills form** → Name, College, Branch, Phone
6. **Submit form** → `POST /api/profile/complete`
7. **Profile marked complete** → `profile_completed = true`
8. **Redirect to dashboard** → `/student/dashboard`

### For Existing Google Users:
1. **Click "Continue with Google"** → `/api/auth/google`
2. **Google Authentication** → User found in database
3. **Check profile status** → If `profile_completed = true`
4. **Direct to dashboard** → `/auth/callback?token=...` → `/student/dashboard`

## 🔧 Backend Endpoints

### Google OAuth Routes:
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Handle Google callback

### Profile Routes:
- `POST /api/profile/complete` - Complete user profile
- `GET /api/profile/me` - Get current user profile
- `PUT /api/profile/update` - Update user profile

## 🗄️ Database Requirements

Make sure you've run this SQL in your Neon database:

```sql
-- Add profile completion tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Make password nullable for Google OAuth users
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

-- Update existing users to mark profile as completed
UPDATE users 
SET profile_completed = true 
WHERE phone IS NOT NULL 
  AND phone != '' 
  AND branch IS NOT NULL 
  AND branch != '' 
  AND college IS NOT NULL 
  AND college != '';
```

## 🧪 Manual Testing Steps

### Test 1: New Google User
1. **Use incognito/private browser**
2. **Go to your app** → `https://your-app.vercel.app`
3. **Click "Continue with Google"**
4. **Use a Google account that hasn't been used before**
5. **Should redirect to profile completion form**
6. **Fill out all fields and submit**
7. **Should redirect to dashboard**

### Test 2: Existing Complete Profile
1. **Use the same Google account from Test 1**
2. **Click "Continue with Google"**
3. **Should go directly to dashboard** (no profile form)

### Test 3: Backend API Testing
```bash
# Test profile completion endpoint
curl -X POST https://your-backend.onrender.com/api/profile/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Doe",
    "college": "MIT",
    "branch": "Computer Science Engineering",
    "phone": "+1234567890"
  }'
```

## 🔍 Debugging

### Check Backend Logs:
1. **Go to Render Dashboard**
2. **Click your backend service**
3. **Check "Logs" tab**
4. **Look for Google OAuth and profile completion logs**

### Check Frontend Console:
1. **Open browser developer tools (F12)**
2. **Go to Console tab**
3. **Look for any JavaScript errors**
4. **Check Network tab for API calls**

### Common Issues:

**Issue: "redirect_uri_mismatch"**
- **Solution:** Add your exact backend URL to Google Console

**Issue: Profile form doesn't appear**
- **Check:** Backend logs for redirect URL
- **Check:** Database - is `profile_completed` set correctly?

**Issue: Form submission fails**
- **Check:** JWT token is being sent correctly
- **Check:** Backend profile route is working

## ✅ Success Indicators

### New User Success:
- ✅ Google OAuth completes
- ✅ Redirected to `/complete-profile`
- ✅ Form appears with pre-filled name
- ✅ Form submission succeeds
- ✅ Redirected to dashboard
- ✅ User can access all features

### Existing User Success:
- ✅ Google OAuth completes
- ✅ Directly redirected to dashboard
- ✅ No profile form appears
- ✅ User can access all features

## 🚀 Production Checklist

- [ ] SQL migration run in Neon database
- [ ] Backend deployed to Render with new routes
- [ ] Frontend deployed to Vercel with new component
- [ ] Google Console has correct redirect URIs
- [ ] Environment variables are set correctly
- [ ] Tested with new Google account
- [ ] Tested with existing Google account

## 📞 If Issues Persist

1. **Check all environment variables** in both Render and Vercel
2. **Verify Google Console settings** match your deployed URLs
3. **Check database** - run the SQL migration
4. **Test locally first** before testing production
5. **Check browser network tab** for failed API calls

The profile completion form should appear immediately after Google OAuth for new users!