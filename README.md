# Portfolio

A modern, fully-responsive portfolio website built with [Next.js](https://nextjs.org) (App Router) and [Tailwind CSS v4](https://tailwindcss.com). Features a built-in CMS admin panel, dark mode, and optional [Appwrite](https://appwrite.io) persistence.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Fonts | Poppins via `next/font` |
| State | React Context + `useSyncExternalStore` |
| CMS | Built-in admin panel at `/admin` |
| Persistence | localStorage (default) or Appwrite |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, skills preview, stats, and CTA |
| `/about` | About section with bio, tech stack, and education |
| `/projects` | Projects showcase with category filtering |
| `/contact` | Contact form with validation and social links |
| `/admin` | Content management system for all portfolio data |

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Panel

Visit `/admin` to edit all portfolio content — hero, about, projects, contact, and social links. Changes are saved to localStorage by default.

### Appwrite Setup (Optional)

To persist data across sessions, configure Appwrite:

1. Create a project at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Copy `.env.example` to `.env` and fill in the values
3. Generate an API key with `databases.write` scope in Appwrite Console
4. Visit `/admin` and click **Setup DB** to auto-create the database and collection

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=portfolio_db
APPWRITE_API_KEY=your_api_key
```

The data is stored across normalized collections (`hero`, `about_bio`, `skills`, `education`, `projects`, `project_tags`, `projects_config`, `contact`, `social`, `meta`). The `database/` folder contains CSV seeds that match the collection columns.

If Appwrite is unavailable, the app seamlessly falls back to localStorage.

## Build

```bash
npm run build
```

## Project Structure

```
app/
├── admin/             # Admin panel (Clerk-protected)
├── api/data/          # Portfolio data API (GET/POST)
├── api/setup/         # Appwrite DB setup endpoint
├── components/        # React components
├── data/              # Type definitions & default data
├── lib/               # Appwrite admin & data layer
├── sign-in/           # Custom sign-in page
├── globals.css        # Tailwind theme & animations
├── layout.tsx         # Root layout
└── page.tsx           # Home page
```

## Authentication

The `/admin` route is protected with [Clerk](https://clerk.com). Unauthenticated visitors are redirected to the custom sign-in page at `/sign-in`.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/admin
```
