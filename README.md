# Portfolio

A Next.js portfolio with a private admin login and MongoDB persistence.

## Setup

1. Install dependencies with `npm install`.
2. Create `.env.local` (never commit it) with:

   ```env
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/
   MONGODB_DB=portfolio
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD_HASH=scrypt:YOUR_SALT:YOUR_PASSWORD_HASH
   ```

3. Create a MongoDB database user with access only to the portfolio database.
   Configure the Atlas network access list for your deployment. Use a unique,
   strong password and URL-encode special characters in the connection string.
4. Run `node scripts/hash-admin-password.cjs` to generate the password hash,
   then paste the output into `.env.local`. The password is visible while typed;
   run this in a private terminal. Use a unique password of at least 16 characters.
5. Run `npm run dev` and open `http://localhost:3000`.
   Sign in at `/admin` and save a section to create the portfolio document.

MongoDB collections are created on first write: `portfolio` contains the public
portfolio document, while `messages` contains private contact submissions.
Each admin section's **Save Changes** button writes that section to the
`portfolio` collection. On the first save, the remaining sections are initialized
with the built-in defaults. Refresh the site to see saved changes.
In **Projects**, expand a project and upload a JPEG, PNG, or WebP banner up to
3 MB, then click **Save Changes** to publish it. Images are converted to WebP
and stored in MongoDB's `project_images` collection. Uploaded images remain in
that collection if a banner is replaced, removed, or not saved; they are not
automatically deleted.
The **Site Content** tab controls the home-page section headings, expertise
cards, role, graduation year, about-page introduction and principles, contact
availability text, and footer description. The other tabs manage the hero,
biography, skills, education, projects, contact details, social links, and SEO
metadata. Existing records without the new fields use defaults until saved.
There is no public endpoint for reading messages. If the database is empty or
unavailable, the site displays its built-in example content; CMS saves and
contact submissions require a working connection.

Existing PostgreSQL data is **not automatically migrated**. If you have an
existing database, export/import its contents separately before retiring it.

## Data and security

- `server/db/`, `server/auth/`, and `server/portfolio/` are server-only modules.
  Credentials belong in server environment variables, never `NEXT_PUBLIC_*`.
- `app/data/portfolio-data.ts` contains TypeScript types only. Default content
  lives in `server/portfolio/defaults.ts`.
- Portfolio content is intentionally public: it must be delivered to a visitor's
  browser to render the site, and is available through `GET /api/portfolio`.
  Do not put private data in portfolio fields.
- `PUT /api/admin/portfolio` checks the server-side admin session. Sessions use
  an HTTP-only, same-site cookie and expire after eight hours; logging out revokes
  the stored session. Login attempts are limited globally to five per 15 minutes
  using MongoDB. A shared limit can be exhausted by an attacker, so also use
  edge rate limiting and monitoring. Always use HTTPS in production and configure
  your reverse proxy to preserve the public origin for same-origin checks.
- Contact form writes are public; add rate limiting and spam
  protection at the deployment edge before production.
- `.env*` files are ignored by Git. Never put secrets or database exports under
  `public/`.

## Structure

```text
app/                  Pages, API route handlers, components, and shared types
server/db/            MongoDB connection
server/auth/          Server-side administrator authorization
server/portfolio/     Repository, validation, and example defaults
public/               Publicly accessible static assets
```
