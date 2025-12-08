-- Add source_code_link and delivery_notes columns to projects table

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS source_code_link VARCHAR(500),
ADD COLUMN IF NOT EXISTS delivery_notes TEXT;

-- Create index for faster queries on completed projects with source code
CREATE INDEX IF NOT EXISTS idx_projects_source_code ON projects(source_code_link) WHERE source_code_link IS NOT NULL;
