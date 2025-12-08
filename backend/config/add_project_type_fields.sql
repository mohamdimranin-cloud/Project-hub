-- Add prototype and documentation specific fields to projects table

-- Prototype fields
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS problem_statement TEXT,
ADD COLUMN IF NOT EXISTS target_platform VARCHAR(100),
ADD COLUMN IF NOT EXISTS prototype_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS preferred_tools VARCHAR(255),
ADD COLUMN IF NOT EXISTS number_of_screens INTEGER,
ADD COLUMN IF NOT EXISTS reference_designs TEXT;

-- Documentation fields
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS document_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS college_format VARCHAR(255),
ADD COLUMN IF NOT EXISTS number_of_pages INTEGER,
ADD COLUMN IF NOT EXISTS plagiarism_limit VARCHAR(50),
ADD COLUMN IF NOT EXISTS reference_file TEXT,
ADD COLUMN IF NOT EXISTS special_instructions TEXT;

-- Update project_type constraint to include new types
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_project_type_check;
ALTER TABLE projects ADD CONSTRAINT projects_project_type_check 
CHECK (project_type IN ('mini', 'major', 'prototype', 'design'));
