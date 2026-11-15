# Portfolio

A Next.js portfolio with a private admin login and MySQL persistence using Prisma ORM.
There is no separate PHP service: the Next.js server handles database access.

## Setup

1. Create a dedicated MySQL 8 database and a user with access to that database.
   A production deployment needs a MySQL host reachable from the deployment.
2. Install dependencies with `npm install`.
3. Create a private `.env` file in the project root:

   ```env
   DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:3306/portfolio"
   ADMIN_USERNAME="your_admin_username"
   ADMIN_PASSWORD_HASH="scrypt:YOUR_SALT:YOUR_PASSWORD_HASH"
   ```

   URL-encode special characters in the MySQL username and password. Never
   commit this file or use a `NEXT_PUBLIC_` prefix for these values. Prisma's
   CLI loads `.env`; Next.js also supports `.env.local`, but Prisma CLI commands
   do not automatically load `.env.local`.
4. Generate an admin password hash with `node scripts/hash-admin-password.cjs`.
   The password is visible while typed, so use a private terminal. Paste the
   resulting complete `ADMIN_PASSWORD_HASH=...` value into `.env`.
5. **For a new, empty database**, create the tables with:

   ```bash
   npx prisma migrate deploy
   ```

   This applies the checked-in MySQL migration. Do not run it against an
   existing database with conflicting tables without reviewing and backing up
   that database first. The command changes the database, so it is not run
   automatically on deployment.
6. Start the app with `npm run dev`. Sign in at `/admin` and save a section.

For Vercel, set `DATABASE_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD_HASH`
in the appropriate project environment, then redeploy. The build generates
the Prisma client; run the migration separately against the target database.

## Data and updates

The `portfolio` table stores the public portfolio content; `messages` stores
contact submissions, `project_images` stores uploaded banners, and the
`admin_sessions` and `admin_login_limits` tables protect admin access. Existing
MongoDB data, uploaded images, and login sessions are **not automatically
migrated**. Keep the old database until you have backed up and imported any data
you need. Existing MongoDB image URLs cannot be served from MySQL until those
images are imported or re-uploaded.

Each **Save Changes** button stores its section in MySQL. The active admin view
updates after a successful save, other tabs in the same browser are notified,
and visible pages on other devices refresh their data approximately every five
seconds. Actual timing depends on network and browser availability. Drafts in an
editor can be replaced if someone else changes the same section while it is open;
avoid editing the same section concurrently. Failed saves do not show success.

In **Projects**, upload a JPEG, PNG, or WebP banner up to 3 MB, then save the
section. Images are converted to WebP. Replaced or unpublished uploads are not
automatically deleted.

## Security

- Prisma and all database credentials remain server-only. Public portfolio data
  is exposed through `GET /api/portfolio` because browsers must read it.
- The admin API checks a server-side session and same-origin requests. Sessions
  use an HTTP-only cookie and expire after eight hours. Login attempts are
  limited globally; also use edge rate limiting and monitoring in production.
- Contact submissions are public writes. Add spam protection and edge rate
  limiting before production. There is no public endpoint to read messages.
- Configure HTTPS and MySQL network restrictions for production.

## Structure

```text
app/                  Pages, API routes, components, shared types
prisma/               Prisma MySQL schema and migrations
server/db/            Server-only Prisma client
server/auth/          Administrator authentication
server/portfolio/     Portfolio repository, validation, defaults
public/               Public static assets
```
