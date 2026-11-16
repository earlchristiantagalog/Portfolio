# Portfolio

A Next.js portfolio with a private admin login and Neon PostgreSQL persistence
using Prisma ORM.

## Connect Neon

1. Create a Neon project and a **new, empty PostgreSQL database**. Existing
   databases may have tables with the same names but a different structure.
2. Copy the PostgreSQL connection string from Neon's **Connect** dialog.
   For serverless deployments, use Neon's pooled connection string when
   available, including its SSL parameters.
3. Install dependencies with `npm install`, then create a private `.env`:

   ```env
   DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST/DBNAME?sslmode=require"
   ADMIN_USERNAME="your_admin_username"
   ADMIN_PASSWORD_HASH="scrypt:YOUR_SALT:YOUR_PASSWORD_HASH"
   ```

   Replace the example URI with your actual Neon connection string. Keep the
   credentials private; do not commit `.env` or prefix secrets with
   `NEXT_PUBLIC_`. Prisma's CLI loads `.env`; Next.js also loads `.env.local`,
   but Prisma CLI commands do not automatically load `.env.local`.
4. If needed, generate an admin password hash using
   `node scripts/hash-admin-password.cjs`. The password is visible while typed;
   run the command in a private terminal.
5. For a **new, empty database**, run:

   ```bash
   npx prisma migrate deploy
   ```

   This creates the required PostgreSQL tables. Do not run the initial migration
   against an existing database with conflicting tables without reviewing and
   backing it up. Use Neon's direct (non-pooled) connection string for migration
   if the pooled endpoint does not support the migration operation.
6. Run `npm run dev`, open `/admin`, and save your portfolio content.

For Vercel, configure `DATABASE_URL`, `ADMIN_USERNAME`, and
`ADMIN_PASSWORD_HASH` for the appropriate environment and redeploy. Run the
migration separately against the target database before using the admin panel.
The build generates the Prisma client but does not modify the database.

Existing MySQL, MongoDB, or older PostgreSQL data and uploaded images are **not
automatically migrated**. Keep and back up the old database until any content
you need has been transferred. Previous image URLs will not work until images
are imported or re-uploaded to the new database.

## Display and updates

The first page render reads portfolio data on the server, avoiding a client
loading screen and default-content flash when the database is available.
If the database cannot be reached, the site falls back to example content and
logs a safe error category; admin saves still require the database. Server
rendering does not eliminate network or database latency.

After a successful admin save, the current view updates, other tabs in the same
browser are notified, and visible pages on other devices refresh approximately
every five seconds. Network and browser conditions affect timing. Avoid editing
the same section concurrently: an external update can replace an open draft.

The `portfolio` table stores public content; `messages` stores contact messages,
`project_images` stores uploaded banners, and `admin_sessions` and
`admin_login_limits` protect admin access. Banner uploads accept JPEG, PNG, and
WebP files up to 3 MB; click **Save Changes** after uploading. Replaced or
unpublished uploads are not automatically deleted. The admin **Messages** tab
shows contact submissions privately, with pagination and a refresh button.
Its reply assistant prepares an editable template and opens a Gmail compose
window; it does not use external AI or send email automatically.
Messages can be marked resolved or reopened. Deletion is permanent and requires
confirmation. Apply pending migrations before using the message status feature.
Use **Close messages** or **Open messages** in the Messages tab to control the
public contact form. Closing hides the form and prevents new submissions at the
API; it remains closed until an admin reopens it.

## Security

- Prisma and database credentials remain server-only. Portfolio content is
  public through `GET /api/portfolio`; never put private data in its fields.
- Admin operations require a server-side session and same-origin requests.
  Sessions use an HTTP-only cookie and expire after eight hours. Login attempts
  are limited globally; also use edge rate limiting and monitoring.
- Contact submissions are public writes. Add spam protection and edge rate
  limiting in production. There is no public endpoint to read messages.
- Use HTTPS and follow Neon's network and least-privilege security guidance.

## Structure

```text
app/                  Pages, API routes, components, shared types
prisma/               Prisma PostgreSQL schema and initial migration
server/db/            Server-only Prisma client
server/auth/          Administrator authentication
server/portfolio/     Portfolio repository, validation, defaults
public/               Public static assets
```
