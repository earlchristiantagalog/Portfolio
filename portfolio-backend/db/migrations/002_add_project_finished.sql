-- Add 'finished' column to projects table
-- Run: psql $DATABASE_URL -f db/migrations/002_add_project_finished.sql

ALTER TABLE projects ADD COLUMN IF NOT EXISTS finished BOOLEAN NOT NULL DEFAULT true;
