# Database Migration Guide

## Adding Source Code Link Feature

This migration adds `source_code_link` and `delivery_notes` columns to the projects table.

### Option 1: Run Migration Script (Recommended)

```bash
cd backend
npm run migrate
```

### Option 2: Manual SQL Execution

Connect to your Neon PostgreSQL database and run:

```sql
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS source_code_link VARCHAR(500),
ADD COLUMN IF NOT EXISTS delivery_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_projects_source_code 
ON projects(source_code_link) 
WHERE source_code_link IS NOT NULL;
```

### Option 3: Re-initialize Database (Development Only)

⚠️ **Warning**: This will drop all existing data!

```bash
cd backend
npm run init-db
```

### Verify Migration

After running the migration, verify the columns exist:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name IN ('source_code_link', 'delivery_notes');
```

### What This Migration Does

1. Adds `source_code_link` column to store GitHub/Drive links
2. Adds `delivery_notes` column for admin delivery instructions
3. Creates an index for faster queries on completed projects with source code

### Rollback (if needed)

```sql
ALTER TABLE projects 
DROP COLUMN IF EXISTS source_code_link,
DROP COLUMN IF EXISTS delivery_notes;

DROP INDEX IF EXISTS idx_projects_source_code;
```
