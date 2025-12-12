# 📝 Profile Completion Setup Guide

## 🎯 What This Adds

When users sign up or log in with Google OAuth, they'll now be prompted to complete their profile with:
- Full Name
- College/University Name  
- Branch/Department
- Contact Number

## 🗄️ Database Changes Required

### Step 1: Run SQL Migration

Go to your **Neon Database Console** and run this SQL:

```sql
-- Add profile completion tracking to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Update existing users to mark profile as completed if they have required fields
UPDATE users 
SET profile_completed = true 
WHERE phone IS NOT NULL 
  AND phone != '' 
  AND branch IS NOT NULL 
  AND branch != '' 
  AND college IS NOT NULL 
  AND college != '';

-- Make password nullable for Google OAuth users
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
```

### Step 2: Deploy Backend Changes

The backend now includes:
- ✅ Updated Google OAuth flow to check profile completion
- ✅ New `/api/profile/complete` endpoint
- ✅ New `/api/profile/me` endpoint  
- ✅ New `/api/profile/update` endpoint

### Step 3: Deploy Frontend Changes

The frontend now includes:
- ✅ New `CompleteProfile` component
- ✅ Route `/complete-profile` 
- ✅ Dashboard checks for profile completion
- ✅ Automatic redirect to profile completion

## 🔄 User Flow

### New Google OAuth Users:
1. **Click "Continue with Google"**
2. **Google authentication** 
3. **Redirected to `/complete-profile`** (if profile incomplete)
4. **Fill out profile form** (name, college, branch, phone)
5. **Submit form** → Profile marked as completed
6. **Redirected to dashboard**

### Existing Users:
- **Regular login** → Dashboard (no changes)
- **Google login with complete profile** → Dashboard
- **Google login with incomplete profile** → Complete profile form

## 🧪 Testing

### Test New Google User:
1. Use a new Google account
2. Click "Continue with Google"
3. Should see profile completion form
4. Fill out all fields and submit
5. Should redirect to dashboard

### Test Existing User:
1. Use existing Google account
2. Should go directly to dashboard (if profile was already complete)

## 🔧 API Endpoints

### Complete Profile
```
POST /api/profile/complete
Authorization: Bearer <token>

Body:
{
  "name": "John Doe",
  "college": "MIT",
  "branch": "Computer Science Engineering", 
  "phone": "+1234567890"
}
```

### Get Profile
```
GET /api/profile/me
Authorization: Bearer <token>
```

### Update Profile  
```
PUT /api/profile/update
Authorization: Bearer <token>

Body:
{
  "name": "John Doe",
  "college": "MIT",
  "branch": "Computer Science Engineering",
  "phone": "+1234567890"
}
```

## 📋 Branch Options

The form includes these branch options:
- Computer Science Engineering
- Information Technology
- Electronics and Communication Engineering
- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Chemical Engineering
- Biotechnology
- Aerospace Engineering
- Automobile Engineering
- Other

## ✅ Validation

### Frontend Validation:
- All fields required
- Phone number format validation
- Branch selection from dropdown

### Backend Validation:
- All fields required and non-empty
- Phone number regex validation
- Proper error messages

## 🚀 Deployment Steps

1. **Run the SQL migration** in Neon console
2. **Deploy backend** to Render (will auto-deploy on git push)
3. **Deploy frontend** to Vercel (will auto-deploy on git push)
4. **Test the flow** with a new Google account

## 🎉 Result

New Google OAuth users will have a smooth onboarding experience and all users will have complete profile information for better project management!
