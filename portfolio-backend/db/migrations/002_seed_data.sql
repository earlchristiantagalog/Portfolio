-- Seed Data Migration (idempotent - safe to run multiple times)

-- Hero
INSERT INTO hero (id, name, title, tagline, availability)
VALUES ('hero', 'John Doe', 'JD',
  'A passionate Full-Stack Developer crafting modern web experiences with clean code and thoughtful design.',
  'Available for work')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, title = EXCLUDED.title,
  tagline = EXCLUDED.tagline, availability = EXCLUDED.availability,
  updated_at = NOW();

-- Education
INSERT INTO education (id, school, degree, status, description, logo)
VALUES ('education', 'University of Cebu',
  'Bachelor of Science in Information Technology', 'First Year Student',
  'Currently learning the fundamentals of IT, programming, and web development. Eager to apply classroom knowledge to real-world projects.',
  '/uc-logo-bg-160x83.c24343b851e5b064daf9.png')
ON CONFLICT (id) DO UPDATE SET
  school = EXCLUDED.school, degree = EXCLUDED.degree, status = EXCLUDED.status,
  description = EXCLUDED.description, logo = EXCLUDED.logo, updated_at = NOW();

-- Projects config
INSERT INTO projects_config (id, heading, subtitle)
VALUES ('projects_config', 'Projects', 'Here are some of the projects I''ve worked on')
ON CONFLICT (id) DO UPDATE SET
  heading = EXCLUDED.heading, subtitle = EXCLUDED.subtitle, updated_at = NOW();

-- Contact config
INSERT INTO contact (id, heading, subtitle)
VALUES ('contact', 'Get In Touch', 'Have a project in mind or just want to chat? Feel free to reach out!')
ON CONFLICT (id) DO UPDATE SET
  heading = EXCLUDED.heading, subtitle = EXCLUDED.subtitle, updated_at = NOW();

-- Social links
INSERT INTO social (id, github, linkedin, email)
VALUES ('social', 'https://github.com', 'https://linkedin.com', 'john@example.com')
ON CONFLICT (id) DO UPDATE SET
  github = EXCLUDED.github, linkedin = EXCLUDED.linkedin,
  email = EXCLUDED.email, updated_at = NOW();

-- Meta
INSERT INTO meta (id, title, description)
VALUES ('meta', 'John Doe | Full-Stack Developer',
  'Professional portfolio of John Doe — Full-Stack Developer specializing in modern web experiences.')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, description = EXCLUDED.description, updated_at = NOW();

-- Clear and re-seed projects (UUIDs make ON CONFLICT impractical)
DELETE FROM project_tags;
DELETE FROM projects;

INSERT INTO projects (title, description, image, category, github, live, position)
VALUES
  ('Student Enrollment System', 'A web-based enrollment system for managing student registration and records.', '/file.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 0),
  ('Library Management App', 'System for tracking books, borrowing, and returns with a simple dashboard.', '/globe.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 1),
  ('Class Attendance Tracker', 'Attendance monitoring tool with CSV export and summary reports.', '/window.svg', 'School Projects', 'https://github.com', 'https://vercel.com', 2),
  ('E-Commerce Platform', 'A full-stack e-commerce solution with cart, checkout, and payment integration.', '/file.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 3),
  ('Weather Dashboard', 'Beautiful weather app with 7-day forecasts, interactive maps, and alerts.', '/window.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 4),
  ('Portfolio CMS', 'Headless CMS for managing portfolio content with an intuitive admin panel.', '/next.svg', 'Personal Projects', 'https://github.com', 'https://vercel.com', 5);

INSERT INTO project_tags (project_id, tag)
SELECT p.id, t.tag FROM projects p
JOIN (VALUES
  ('Student Enrollment System', 'HTML'), ('Student Enrollment System', 'CSS'), ('Student Enrollment System', 'JavaScript'), ('Student Enrollment System', 'PHP'),
  ('Library Management App', 'React'), ('Library Management App', 'Node.js'), ('Library Management App', 'MongoDB'),
  ('Class Attendance Tracker', 'Next.js'), ('Class Attendance Tracker', 'TypeScript'), ('Class Attendance Tracker', 'Tailwind'),
  ('E-Commerce Platform', 'Next.js'), ('E-Commerce Platform', 'Stripe'), ('E-Commerce Platform', 'PostgreSQL'),
  ('Weather Dashboard', 'TypeScript'), ('Weather Dashboard', 'OpenWeather API'), ('Weather Dashboard', 'Chart.js'),
  ('Portfolio CMS', 'Next.js'), ('Portfolio CMS', 'Sanity'), ('Portfolio CMS', 'Vercel')
) AS t(project_title, tag) ON p.title = t.project_title;

-- Clear and re-seed about_bio
DELETE FROM about_bio;
INSERT INTO about_bio (paragraph, position)
VALUES
  ('I''m a first-year college student pursuing a Bachelor of Science in Information Technology at the University of Cebu. I have a strong passion for web development and enjoy learning new technologies to build modern, user-friendly applications.', 0),
  ('Outside of coding, I enjoy exploring new tools, collaborating with fellow developers, and continuously improving my skills to grow in the tech industry.', 1);

-- Clear and re-seed skills
DELETE FROM skills;
INSERT INTO skills (skill, position)
VALUES
  ('JavaScript', 0), ('HTML/CSS', 1), ('React', 2), ('Next.js', 3),
  ('Node.js', 4), ('Python', 5), ('Tailwind CSS', 6), ('Git', 7);
