-- Add download_unlocked column to projects table

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS download_unlocked BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_download_unlocked ON projects(download_unlocked) WHERE download_unlocked = true;
