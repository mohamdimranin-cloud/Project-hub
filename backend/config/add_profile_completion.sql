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