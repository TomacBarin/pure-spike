# Phase 4: Deploy & Production Polish

**Version:** 0.1  
**Date:** 2026-08-06  
**Status:** Ready for planning  
**Phase Goal:** Make Pure Spike Studio publicly reachable, production-safe, and portfolio-ready — without changing the core MVP feature set.

---

## 1. Overview & Goals

Phase 3 delivered a working fullstack MVP locally. Phase 4 is about **shipping it**.

**Goals for this phase:**

- Deploy frontend to Vercel
- Deploy backend to a Node host (Render, Railway, or Fly.io)
- Configure production environment variables, CORS, and secure cookies
- Verify auth + presets work on the live site
- Run Lighthouse against the production URL
- Update README so recruiters understand the project in 60 seconds
- Optional polish: performance, accessibility, small UX fixes

**Success criteria:**

- Anyone can open a public URL and use the generator as a guest
- Register / login / save presets works in production
- HTTPS everywhere
- README clearly explains stack, features, and how to run locally
- No secrets committed

---

## 2. Recommended deployment layout

| Part     | Service                   | Notes                              |
| -------- | ------------------------- | ---------------------------------- |
| Frontend | **Vercel**                | Root is already a Vite app — ideal |
| Backend  | **Render** or **Railway** | Simple Node deploy from `/backend` |
| Database | **MongoDB Atlas**         | Already in use                     |

No need to move frontend into a `/frontend` folder. Vercel builds from repo root with:

- Build command: `npm run build`
- Output directory: `dist`

Backend deploys from the `backend/` subdirectory with its own `package.json`.

---

## 3. Production concerns checklist

### Environment

- [ ] `MONGODB_URI` on backend host
- [ ] `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` (long random values)
- [ ] `FRONTEND_ORIGIN` = production Vercel URL
- [ ] `NODE_ENV=production`

### Cookies & CORS

- [ ] `secure: true` for refresh cookie in production
- [ ] `sameSite: 'none'` if frontend and backend are on different domains
- [ ] CORS allows the Vercel origin with `credentials: true`

### Frontend

- [ ] API base URL points at production backend (env variable, e.g. `VITE_API_URL`)
- [ ] Or keep relative `/api` and configure a Vercel rewrite/proxy to the backend

### Security

- [ ] No `.env` files in git
- [ ] Helmet already enabled
- [ ] Rate limiting (optional but recommended for auth routes)

---

## 4. Step-by-step plan (high level)

### Step 1 – Backend production deploy

- Create service from `backend/`
- Set env vars
- Confirm `GET /api/v1/health` works on public URL

### Step 2 – Frontend production config

- Add `VITE_API_URL` (or Vercel rewrites)
- Build locally once to verify (`npm run build && npm run preview`)

### Step 3 – Frontend deploy on Vercel

- Import repo, framework preset Vite
- Deploy
- Set env if needed

### Step 4 – End-to-end production test

- Guest generate + download
- Register / login
- Save / load / delete preset
- Account deletion
- Session refresh after reload

### Step 5 – Lighthouse + polish

- Run Lighthouse on production URL
- Fix only high-impact issues (a11y, SEO meta already started, obvious performance)

### Step 6 – README & portfolio packaging

- Clear project description
- Screenshots or short GIF
- Tech stack
- Local setup instructions
- Live demo link

---

## 5. Out of scope for Phase 4

- New impulse types
- Social login / email verification
- Preset sharing / public gallery
- Monorepo migration (`/frontend` folder)
- Major UI redesign

---

## 6. After Phase 4

Possible future ideas (not committed):

- Password reset flow
- More impulse types (sine sweep, etc.)
- Keyboard shortcuts polish
- Automated tests (Vitest / Playwright)
- Custom domain

---

**End of Phase 4 Document v0.1**
