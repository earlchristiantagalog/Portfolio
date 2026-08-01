# Portfolio Backend Deployment Guide

## Quick Start (Local Development)

### 1. Set Up Neon DB
1. Go to https://neon.tech and create a free account
2. Create a new project called `portfolio`
3. Copy the connection string from the dashboard

### 2. Configure Environment
```bash
cd portfolio-backend
cp .env.example .env
# Edit .env and paste your DATABASE_URL
```

Your `.env` is the single source of truth for all backend config:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
JWT_SECRET=your-secret-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://earlchristian.me,https://www.earlchristian.me,http://localhost:3000
```

### 3. Initialize Database
```bash
# Creates tables + seeds default data (safe to re-run)
node scripts/setup-db.js
```

### 4. Create Admin User
```bash
node scripts/create-admin.js admin your-password
```

### 5. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 6. Configure Frontend (.env.local in Next.js root)
```bash
# In the portfolio/ root directory
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
```

---

## Production Deployment (Render/Railway/Fly.io)

### Step 1: Deploy Backend

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository (the `portfolio-backend/` directory)
4. Configure:
   - **Name:** `portfolio-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Port:** 5000

5. Add these Environment Variables (copy from your `.env`):
   ```
   DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
   JWT_SECRET=your-strong-random-secret
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://earlchristian.me,https://www.earlchristian.me
   NODE_ENV=production
   ```

6. Click **Create Web Service**

### Step 2: Initialize Production Database

Click **Manual Deploy** → **Deploy latest commit** after adding env vars.
Then open the Render shell (or run locally with production DATABASE_URL):
```bash
node scripts/setup-db.js
node scripts/create-admin.js admin your-password
```

### Step 3: Set Frontend Env Var

In Vercel dashboard → your project → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL = https://portfolio-backend.onrender.com
```

Redeploy the frontend after adding this.

---

## API Endpoints

### Public (No Auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Fetch all portfolio data |
| POST | `/api/messages` | Submit contact form |
| POST | `/api/setup` | Initialize database tables + seed |
| GET | `/health` | Health check |

### Admin (Requires JWT Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login (returns JWT) |
| GET | `/api/auth/verify` | Verify token is valid |
| PUT | `/api/admin/portfolio` | Update full portfolio at once |
| PUT | `/api/admin/hero` | Update hero section |
| PUT | `/api/admin/education` | Update education |
| PUT | `/api/admin/about-bio` | Update bio paragraphs |
| POST | `/api/admin/skills` | Add skill |
| DELETE | `/api/admin/skills/:id` | Delete skill |
| PUT | `/api/admin/skills` | Replace all skills |
| GET | `/api/admin/projects` | List projects |
| POST | `/api/admin/projects` | Create project |
| PUT | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |
| PUT | `/api/admin/projects-config` | Update projects heading |
| PUT | `/api/admin/contact` | Update contact section |
| PUT | `/api/admin/social` | Update social links |
| PUT | `/api/admin/meta` | Update SEO meta |
| GET | `/api/admin/messages` | List contact submissions |
| PATCH | `/api/admin/messages/:id/read` | Mark message read |
| DELETE | `/api/admin/messages/:id` | Delete message |

---

## Troubleshooting

### "Setup DB" button shows error
- Check `NEXT_PUBLIC_API_URL` is set in Vercel (must be the full backend URL)
- Check backend logs in Render dashboard for the actual SQL error
- Open browser DevTools → Network → click the failed request → Response tab

### "CORS error" in browser console
- Ensure `CORS_ORIGIN` in backend `.env` includes `https://earlchristian.me`
- Redeploy backend after changing env vars

### "Database connection failed"
- Check `DATABASE_URL` is correct in `.env`
- Neon free tier pauses after inactivity — visit neon dashboard to wake it
- Ensure `?sslmode=require` is at the end of the URL

### "NEXT_PUBLIC_API_URL is not set" alert
- Add `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com` in Vercel env vars
- Redeploy the frontend

---

## Environment Variables

| Variable | Where | Required | Description |
|----------|-------|----------|-------------|
| `PORT` | Backend `.env` | No (default 5000) | Server port |
| `NODE_ENV` | Backend `.env` | No (default development) | production/development |
| `DATABASE_URL` | Backend `.env` | Yes | Neon DB connection string |
| `JWT_SECRET` | Backend `.env` | Yes | Secret for signing JWT tokens |
| `JWT_EXPIRES_IN` | Backend `.env` | No (default 7d) | Token expiry duration |
| `CORS_ORIGIN` | Backend `.env` | No | Comma-separated allowed origins |
| `NEXT_PUBLIC_API_URL` | Frontend `.env.local` | Yes | Backend URL (e.g. http://localhost:5000) |
