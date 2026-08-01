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

### 3. Initialize Database
```bash
npm run db:setup
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 5. Configure Frontend
```bash
# In the root portfolio directory
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
```

---

## Production Deployment (Render/Railway/Fly.io)

### Step 1: Push Backend to GitHub

Create a new repository or subdirectory:
```
portfolio-backend/
├── .gitignore (includes .env)
├── package.json
├── server.js
└── ...
```

### Step 2: Deploy to Render

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `portfolio-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Port:** 5000

5. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://...neon.tech:5432/portfolio_db?sslmode=require
   JWT_SECRET=your-super-secret-key-here
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://earlchristian.me,https://www.earlchristian.me,http://localhost:3000
   NODE_ENV=production
   ```

6. Click **Create Web Service**

### Step 3: Initialize Production Database

After deployment, SSH into the service or run locally:
```bash
# Set DATABASE_URL to your production Neon URL
npm run db:setup
npm run db:seed
node scripts/create-admin.js admin your-password
```

### Step 4: Update Frontend Environment

In your Next.js project root:
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://portfolio-backend.onrender.com
```

### Step 5: Update CORS on Backend

In Render dashboard, ensure:
```
CORS_ORIGIN=https://earlchristian.me,https://www.earlchristian.me,https://your-vercel-app.vercel.app
```

---

## API Endpoints Reference

### Public (No Auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Fetch all portfolio data |
| POST | `/api/messages` | Submit contact form |
| GET | `/health` | Health check |

### Admin (Requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/verify` | Verify token |
| PUT | `/api/admin/portfolio` | Update full portfolio |
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
| GET | `/api/admin/messages` | List contact messages |
| PATCH | `/api/admin/messages/:id/read` | Mark message read |
| DELETE | `/api/admin/messages/:id` | Delete message |

---

## Cross-Device Loading Fix

The main issue causing data not to load on other devices was:

1. **Relative API URLs** - The frontend was fetching from `/api/data` which resolves to `localhost` on other devices
2. **Missing CORS headers** - No explicit `Access-Control-Allow-Origin` for external domains
3. **No credentials support** - `Access-Control-Allow-Credentials` was not set

### How It's Fixed

**Frontend** (`portfolio-service.ts`):
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
// Uses absolute URL: https://your-backend.onrender.com/api/portfolio
```

**Backend** (`middleware/cors.js`):
```javascript
const corsOptions = {
  origin: ['https://earlchristian.me', 'https://www.earlchristian.me'],
  credentials: true,  // Allows cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
```

### Verify Fix
1. Open https://earlchristian.me on your phone
2. Open browser DevTools → Network tab
3. Check that `/api/portfolio` returns 200 (not failed)
4. Verify no CORS errors in Console tab

---

## Troubleshooting

### "CORS error" in browser console
- Ensure `CORS_ORIGIN` includes your exact domain
- Check for trailing slashes or protocol mismatches
- Verify the backend is running

### "Database connection failed"
- Check `DATABASE_URL` is correct
- Ensure Neon project is not paused (free tier pauses after inactivity)
- Verify SSL mode is `require`

### "Cannot find module" errors
- Run `npm install` in the backend directory
- Ensure Node.js version is 18+

### Port already in use
- Change `PORT` in `.env` to a different number
- Or stop the process using the port: `lsof -i :5000`

---

## Database Management

### Run migrations
```bash
npm run db:setup
```

### Seed default data
```bash
npm run db:seed
```

### Create admin user
```bash
node scripts/create-admin.js username password
```

### Connect to database directly
```bash
# Using psql
psql $DATABASE_URL

# List tables
\dt

# Check data
SELECT * FROM hero;
SELECT COUNT(*) FROM projects;
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `DATABASE_URL` | Yes | - | Neon DB connection string |
| `JWT_SECRET` | Yes | - | Secret for JWT tokens |
| `JWT_EXPIRES_IN` | No | 7d | Token expiry duration |
| `CORS_ORIGIN` | No | earlchristian.me origins | Comma-separated allowed origins |
