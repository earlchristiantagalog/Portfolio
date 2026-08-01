-- Portfolio Database Schema Migration
-- Run: psql $DATABASE_URL -f db/migrations/001_create_tables.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero section (single row)
CREATE TABLE IF NOT EXISTS hero (
  id TEXT PRIMARY KEY DEFAULT 'hero',
  name VARCHAR(200) NOT NULL DEFAULT '',
  title VARCHAR(200) NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  availability VARCHAR(100) NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About bio paragraphs (multiple rows, ordered)
CREATE TABLE IF NOT EXISTS about_bio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  paragraph TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_about_bio_position ON about_bio(position);

-- Skills (multiple rows, ordered)
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill VARCHAR(200) NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_position ON skills(position);

-- Education (single row)
CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY DEFAULT 'education',
  school VARCHAR(300) NOT NULL DEFAULT '',
  degree VARCHAR(300) NOT NULL DEFAULT '',
  status VARCHAR(100) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects (multiple rows, ordered)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(300) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  category VARCHAR(100) NOT NULL DEFAULT 'Personal Projects',
  github TEXT NOT NULL DEFAULT '',
  live TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_position ON projects(position);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Project tags (multiple rows, linked to projects)
CREATE TABLE IF NOT EXISTS project_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);

-- Projects config (single row)
CREATE TABLE IF NOT EXISTS projects_config (
  id TEXT PRIMARY KEY DEFAULT 'projects_config',
  heading VARCHAR(200) NOT NULL DEFAULT 'Projects',
  subtitle TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact section config (single row)
CREATE TABLE IF NOT EXISTS contact (
  id TEXT PRIMARY KEY DEFAULT 'contact',
  heading VARCHAR(200) NOT NULL DEFAULT 'Get In Touch',
  subtitle TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social links (single row)
CREATE TABLE IF NOT EXISTS social (
  id TEXT PRIMARY KEY DEFAULT 'social',
  github TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  email VARCHAR(200) NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meta/SEO (single row)
CREATE TABLE IF NOT EXISTS meta (
  id TEXT PRIMARY KEY DEFAULT 'meta',
  title VARCHAR(300) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(300) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
