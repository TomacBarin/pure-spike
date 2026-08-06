# Phase 3: Authentication + Preset Management

**Version:** 0.1  
**Date:** 2026-08-04  
**Status:** Ready for implementation  
**Phase Goal:** Give logged-in users the ability to securely register, log in, stay authenticated, and fully manage personal presets (save, load, edit, delete, search, export) — all integrated inside the existing Generator context. Guest mode remains completely unaffected.

---

## 1. Overview & Goals

**Purpose of Phase 3**  
Turn Pure Spike Studio into a true fullstack application. Authentication and preset persistence are the last major missing pieces of the MVP. All impulse generation stays client-side; the backend only handles users and presets.

This phase covers **Epic 3 (User Authentication)** and **Epic 4 (Preset Management)** from `user-stories.md`.

**Goals for this phase:**

- Set up a clean, type-safe Node.js + Express + MongoDB backend that follows `coding-conventions.md`
- Implement secure email/password authentication with short-lived access tokens + httpOnly refresh tokens
- Allow users to save the current generator state as a named preset (with optional description + tags)
- Provide a clean preset management UI **inside the Generator context** (drawer/modal, not a separate page)
- Support full CRUD + search/filter + JSON export of presets
- Support account deletion (cascades to all user presets)
- Keep guest mode 100 % functional and unaffected
- Follow the same Core / Adapter / UI separation, Zod validation, discriminated unions and layered architecture as the rest of the project

**Success Criteria:**

- A visitor can register and log in
- A logged-in user can save the exact current generator parameters as a preset
- The same user can later load, edit, delete and search their presets from within the Generator
- Presets survive page reloads and browser restarts
- Logout and account deletion work correctly
- Guest users never see auth-required UI and never hit protected endpoints
- The code is maintainable, well-typed and follows every convention already established

---

## 2. Technical Approach (High Level)

### 2.1 Architecture Principles

- **Backend** is a separate Express application living in `/backend` (own `package.json`, `tsconfig`, etc.)
- Classic layered architecture: Routes → Controllers → Services → Models
- Zod is the single source of truth for validation (both request bodies and environment variables)
- JWT access tokens (short-lived, ~15–30 min) + refresh tokens stored in httpOnly cookies
- All protected routes require a valid access token; ownership of presets is always checked against `req.user.id`
- Frontend talks to the backend via a thin typed API client (`src/api/`)
- Auth state lives in a React Context (`AuthProvider`) so the whole app knows whether the user is logged in

### 2.2 Key Technologies

| Concern          | Technology / Approach                                     |
| ---------------- | --------------------------------------------------------- |
| Runtime          | Node.js (LTS)                                             |
| Framework        | Express                                                   |
| Database         | MongoDB Atlas + Mongoose                                  |
| Validation       | Zod                                                       |
| Auth             | bcrypt + jsonwebtoken + httpOnly refresh cookies          |
| Frontend API     | Typed `fetch` wrapper (or axios) + credentials: 'include' |
| State (frontend) | `AuthProvider` + `useAuth` + existing generator reducer   |
| UI for presets   | Drawer / modal opened from Generator ActionBar            |

### 2.3 Data Models (from architecture.md)

**User**

```ts
{
  _id: ObjectId,
  email: string,          // unique, lowercase
  password: string,       // bcrypt hashed
  createdAt: Date,
  updatedAt: Date
}
```

**Preset**

```ts
{
  _id: ObjectId,
  userId: ObjectId,       // ref: User
  name: string,
  description?: string,
  tags: string[],
  impulseType: 'pure' | 'noise',
  parameters: {
    sampleRate: number,
    duration: number,
    amplitude: number,
    channels: 'mono' | 'stereo',
    balance?: number,
    fadeIn: number,
    fadeOut: number
  },
  createdAt: Date,
  updatedAt: Date,
  lastUsedAt?: Date,
  usageCount: number
}
```

---

## 3. Backend Folder Structure

```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── src/
│   ├── app.ts                 # Express app setup
│   ├── server.ts              # Entry point (listen)
│   ├── config/
│   │   └── env.ts             # Zod-validated environment
│   ├── models/
│   │   ├── User.ts
│   │   └── Preset.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── preset.service.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── preset.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── preset.routes.ts
│   │   └── index.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   ├── types/
│   │   ├── auth.schemas.ts    # Zod schemas
│   │   └── preset.schemas.ts
│   └── utils/
│       ├── asyncHandler.ts
│       ├── errors.ts
│       └── tokens.ts
```

---

## 4. API Surface (REST)

Base path: `/api/v1`

### Auth

| Method | Path             | Auth required | Description                    |
| ------ | ---------------- | ------------- | ------------------------------ |
| POST   | `/auth/register` | No            | Create account                 |
| POST   | `/auth/login`    | No            | Login → access + refresh token |
| POST   | `/auth/refresh`  | Cookie        | New access token               |
| POST   | `/auth/logout`   | Yes           | Invalidate refresh token       |
| DELETE | `/auth/account`  | Yes           | Delete user + all presets      |

### Presets

| Method | Path              | Auth required | Description                      |
| ------ | ----------------- | ------------- | -------------------------------- |
| GET    | `/presets`        | Yes           | List own presets (search/filter) |
| POST   | `/presets`        | Yes           | Create preset                    |
| GET    | `/presets/:id`    | Yes           | Get single preset                |
| PATCH  | `/presets/:id`    | Yes           | Update name/description/tags     |
| DELETE | `/presets/:id`    | Yes           | Delete preset                    |
| GET    | `/presets/export` | Yes           | Download all presets as JSON     |

All responses follow the conventions in `coding-conventions.md`:

- Success: `{ data: T | T[], meta?: {...} }`
- Error: `{ error: { code, message, details? } }`

---

## 5. Frontend Integration Points

### 5.1 New folders / files

```
src/
├── api/
│   ├── client.ts              # Typed fetch wrapper with credentials
│   ├── auth.ts
│   └── presets.ts
├── providers/
│   └── AuthProvider.tsx
├── features/
│   ├── auth/
│   │   ├── components/        # LoginModal, RegisterModal, etc.
│   │   └── hooks/useAuth.ts
│   └── presets/
│       ├── components/        # PresetDrawer, PresetCard, SavePresetForm…
│       └── hooks/usePresets.ts
```

### 5.2 UI Decisions (agreed)

- **Login / Register** → modals opened from Navbar
- **Preset management** → drawer (or modal) opened from two new buttons in the Generator `ActionBar`:
  - “Save Preset” (opens form pre-filled with current parameters)
  - “My Presets” (opens list with search + load / edit / delete)
- When not logged in the buttons are either hidden or replaced by a subtle “Log in to save presets” hint
- Account settings (including “Delete account”) live in a small modal opened from the avatar dropdown

This keeps the Generator as the single source of truth for the workflow and follows the original layout-spec intention (“inside Generator context”) without forcing a permanent sidebar.

---

## 6. Step-by-Step Implementation Plan

### Step 1 – Backend scaffolding

- Create `/backend` with its own package.json, TypeScript, Express, Mongoose, Zod, dotenv, cors, cookie-parser, helmet
- Environment validation with Zod
- Basic health endpoint + global error middleware
- CORS configured for the Vite dev server

### Step 2 – User model + Auth service

- Mongoose User model
- Register (hash with bcrypt, unique email)
- Login (verify + issue access + refresh tokens)
- Refresh endpoint
- Logout (clear refresh cookie)
- Zod schemas for all auth payloads

### Step 3 – Auth middleware + protected routes

- `requireAuth` middleware that verifies JWT and attaches `req.user`
- Ownership checks on every preset operation

### Step 4 – Preset model + full CRUD

- Mongoose Preset model with `userId` reference
- Service layer with proper ownership filtering
- All endpoints listed in section 4
- `usageCount` / `lastUsedAt` updated on load

### Step 5 – Frontend API client + AuthProvider

- Typed fetch client that always sends cookies
- Automatic token refresh on 401
- `AuthProvider` + `useAuth` that exposes `{ user, login, logout, register, isLoading }`

### Step 6 – Login / Register UI + Navbar

- Modal components
- Update Navbar to show Login/Register or Avatar dropdown
- Persist session across reloads via refresh token

### Step 7 – Preset UI inside Generator

- “Save Preset” form (name, description, tags) → POST /presets
- “My Presets” drawer with search, load (dispatches into generator reducer), edit, delete
- JSON export button
- Optimistic UI + proper loading/error states

### Step 8 – Account deletion + final polish

- Danger-zone in Account Settings modal
- Cascading delete of presets
- Error messages, accessibility, dark/light theme consistency
- Update `current-status.md` and README

---

## 7. Acceptance Criteria for Phase 3

- [ ] Backend starts cleanly and connects to MongoDB Atlas
- [ ] User can register with valid email + password (min 8 chars, 1 letter, 1 number)
- [ ] User can log in and receives working access + refresh tokens
- [ ] Refresh token keeps the session alive across page reloads
- [ ] Logout clears the session
- [ ] Logged-in user can save current generator state as a preset
- [ ] User can list, search, load, edit and delete own presets
- [ ] Loading a preset correctly populates the generator reducer
- [ ] Export downloads a valid JSON file of all presets
- [ ] Account deletion removes the user and all associated presets
- [ ] Guest users never see protected UI and never hit protected endpoints
- [ ] All endpoints validate input with Zod and return consistent error shapes
- [ ] Code follows coding-conventions.md (layered architecture, naming, TypeScript, etc.)
- [ ] No secrets committed; `.env.example` is complete

---

## 8. Risks & Considerations

- **Token security**: Access tokens must be short-lived; refresh tokens must be httpOnly + Secure + SameSite
- **CORS + cookies**: Requires careful configuration in development (Vite proxy or explicit credentials)
- **Ownership bugs**: Every preset route must verify `preset.userId === req.user.id`
- **Scope creep**: Do not add social login, email verification, or password reset in this phase
- **MongoDB free tier**: Be mindful of connection limits during development

---

## 9. Out of Scope for Phase 3

- Email verification / password reset flows
- Social login (Google, GitHub…)
- Sharing presets between users
- Public preset gallery
- Rate limiting beyond a basic helmet setup (can be added later)
- Audio playback inside the browser
- Any new impulse types

---

## 10. Next Phase Preview

After Phase 3 the MVP is complete. Possible future phases:

- Phase 4: Polish, testing, deployment (Vercel + Render/Railway + MongoDB Atlas)
- Phase 5: Additional impulse types, keyboard shortcuts, performance work, accessibility audit

---

**End of Phase 3 Document v0.1**
