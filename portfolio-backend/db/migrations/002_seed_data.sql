-- Seed Data Migration
-- Run: psql $DATABASE_URL -f db/migrations/002_seed_data.sql

-- Hero
INSERT INTO hero (id, name, title, tagline, availability)
VALUES ('hero', 'John Doe', 'JD',
  'A passionate Full-Stack Developer crafting modern web experiences with clean code and thoughtful design.',
  'Available for work')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  availability = EXCLUDED.availability,
  updated_at = NOW();

-- Education
INSERT INTO education (id, school, degree, status, description, logo)
VALUES ('education',
  'University of Cebu',
  'Bachelor of Science in Information Technology',
  'First Year Student',
  'Currently learning the fundamentals of IT, programming, and web development. Eager to apply classroom knowledge to real-world projects.',
  '/uc-logo-bg-160x83.c24343b851e5b064daf9.png')
ON CONFLICT (id) DO UPDATE SET
  school = EXCLUDED.school,
  degree = EXCLUDED.degree,
  status = EXCLUDED.status,
  description = EXCLUDED.description,
  logo = EXCLUDED.logo,
  updated_at = NOW();

-- Projects config
INSERT INTO projects_config (id, heading, subtitle)
VALUES ('projects_config', 'Projects', 'Here are some of the projects I''ve worked on')
ON CONFLICT (id) DO UPDATE SET
  heading = EXCLUDED.heading,
  subtitle = EXCLUDED.subtitle,
  updated_at = NOW();

-- Contact config
INSERT INTO contact (id, heading, subtitle)
VALUES ('contact', 'Get In Touch', 'Have a project in mind or just want to chat? Feel free to reach out!')
ON CONFLICT (id) DO UPDATE SET
  heading = EXCLUDED.heading,
  subtitle = EXCLUDED.subtitle,
  updated_at = NOW();

-- Social links
INSERT INTO social (id, github, linkedin, email)
VALUES ('social', 'https://github.com', 'https://linkedin.com', 'john@example.com')
ON CONFLICT (id) DO UPDATE SET
  github = EXCLUDED.github,
  linkedin = EXCLUDED.linkedin,
  email = EXCLUDED.email,
  updated_at = NOW();

-- Meta
INSERT INTO meta (id, title, description)
VALUES ('meta',
  'John Doe | Full-Stack Developer',
  'Professional portfolio of John Doe — Full-Stack Developer specializing in modern web experiences.')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Seed projects (use DO block to get UUIDs for foreign keys)
DO $$
DECLARE
  proj1_id UUID;
  proj2_id UUID;
  proj3_id UUID;
  proj4_id UUID;
  proj5_id UUID;
  proj6_id UUID;
BEGIN
  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('Student Enrollment System', 'A web-based enrollment system for managing student registration and records.', '/file.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 0)
  RETURNING id INTO proj1_id;

  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('Library Management App', 'System for tracking books, borrowing, and returns with a simple dashboard.', '/globe.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 1)
  RETURNING id INTO proj2_id;

  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('Class Attendance Tracker', 'Attendance monitoring tool with CSV export and summary reports.', '/window.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 2)
  RETURNING id INTO proj3_id;

  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('E-Commerce Platform', 'A full-stack e-commerce solution with cart, checkout, and payment integration.', '/file.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 3)
  RETURNING id INTO proj4_id;

  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('Weather Dashboard', 'Beautiful weather app with 7-day forecasts, interactive maps, and alerts.', '/window.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 4)
  RETURNING id INTO proj5_id;

  INSERT INTO projects (title, description, image, category, github, live, position)
  VALUES ('Portfolio CMS', 'Headless CMS for managing portfolio content with an intuitive admin panel.', '/next.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 5)
  RETURNING id INTO proj6_id;

  -- Project tags
  INSERT INTO project_tags (project_id, tag) VALUES
    (proj1_id, 'HTML'), (proj1_id, 'CSS'), (proj1_id, 'JavaScript'), (proj1_id, 'PHP'),
    (proj2_id, 'React'), (proj2_id, 'Node.js'), (proj2_id, 'MongoDB'),
    (proj3_id, 'Next.js'), (proj3_id, 'TypeScript'), (proj3_id, 'Tailwind'),
    (proj4_id, 'Next.js'), (proj4_id, 'Stripe'), (proj4_id, 'PostgreSQL'),
    (proj5_id, 'TypeScript'), (proj5_id, 'OpenWeather API'), (proj5_id, 'Chart.js'),
    (proj6_id, 'Next.js'), (proj6_id, 'Sanity'), (proj6_id, 'Vercel');
END $$;

-- About bio
INSERT INTO about_bio (paragraph, position)
VALUES
  ('I''m a first-year college student pursuing a Bachelor of Science in Information Technology at the University of Cebu. I have a strong passion for web development and enjoy learning new technologies to build modern, user-friendly applications.', 0),
  ('Outside of coding, I enjoy exploring new tools, collaborating with fellow developers, and continuously improving my skills to grow in the tech industry.', 1);

-- Skills
INSERT INTO skills (skill, position)
VALUES
  ('JavaScript', 0),
  ('HTML/CSS', 1),
  ('React', 2),
  ('Next.js', 3),
  ('Node.js', 4),
  ('Python', 5),
  ('Tailwind CSS', 6),
  ('Git', 7);
