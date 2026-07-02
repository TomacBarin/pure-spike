# Architecture Document – Pure Spike Studio

**Version:** 0.1  
**Date:** 2026-07-02  
**Status:** Draft  
**Author:** Solution Architect (BMAD Team)  
**Based on:** PRD v0.1

---

## 1. Introduction

This document describes the technical architecture for **Pure Spike Studio**, a fullstack web application for generating and managing high-quality impulse responses (IRs).

The architecture is designed to be:

- Clear and maintainable
- Aligned with the developer’s coding conventions and quality guidelines
- Suitable for a student developer with approximately one year of fullstack experience
- Focused on delivering a production-ready MVP by the end of August 2026

## 2. High-Level Architecture

Pure Spike Studio follows a classic **client-server architecture** with the following characteristics:

- **Frontend (Client)**: React + TypeScript single-page application. All impulse generation and audio processing happens client-side using the Web Audio API.
- **Backend (Server)**: Node.js + Express REST API responsible for authentication and preset persistence.
- **Database**: MongoDB (via Mongoose).
- **Communication**: REST API over HTTPS using JSON.

```
┌─────────────────────┐          ┌─────────────────────┐
│   React Frontend    │   REST   │   Express Backend   │
│  (Vite + TS)        │ ◄──────► │  (Node.js + Zod)    │
│                     │          │                     │
│ - Waveform Canvas   │          │ - Auth (JWT)        │
│ - Parameter UI      │          │ - Preset CRUD       │
│ - Client-side       │          │ - User management   │
│   generation        │          │                     │
└─────────────────────┘          └──────────┬──────────┘
                                            │
                                            ▼
                                     ┌──────────────┐
                                     │   MongoDB    │
                                     │  (Mongoose)  │
                                     └──────────────┘
```

## 3. Technology Stack

| Layer      | Technology                          | Justification                                               |
| ---------- | ----------------------------------- | ----------------------------------------------------------- |
| Frontend   | React 19 + TypeScript + Vite        | Modern, type-safe, fast dev experience                      |
| Styling    | CSS Modules + Design Tokens         | Follows coding conventions                                  |
| State      | useState + useReducer + Context     | Matches coding conventions (discriminated unions preferred) |
| Routing    | React Router                        | Standard for SPAs                                           |
| Audio      | Web Audio API + OfflineAudioContext | Client-side generation (no server load)                     |
| Backend    | Node.js + Express                   | Familiar from studies                                       |
| Validation | Zod                                 | Type-safe validation on both ends                           |
| Database   | MongoDB + Mongoose                  | Document-based, good for presets                            |
| Auth       | JWT + bcrypt + Refresh Tokens       | Secure and modern                                           |
| Testing    | Jest + React Testing Library        | Follows coding conventions                                  |

## 4. Frontend Architecture

### 4.1 Project Structure

Following the developer’s coding conventions:

```
src/
├── components/          # Reusable UI components (PascalCase)
├── features/            # Feature-based folders (e.g. generator, presets, auth)
├── hooks/               # Custom hooks (use*)
├── pages/               # Route-level components
├── layouts/             # Layout components
├── api/                 # Typed API client
├── types/               # Shared TypeScript types & Zod schemas
├── utils/               # Helper functions
├── styles/              # Global styles + design tokens
├── App.tsx
└── main.tsx
```

### 4.2 Key Patterns

- **State Management**: Use `useReducer` with discriminated unions for complex state (e.g. generator settings, async preset loading).
- **API Layer**: Create a robust `fetchJson<T>` wrapper with proper error handling (`HttpError`).
- **Forms**: Controlled components + `useReducer` for complex forms.
- **Audio Generation**: Encapsulate all Web Audio logic in a dedicated service/hook (e.g. `useImpulseGenerator.ts`).

### 4.3 Main Screens / Views

- **Generator Page** (main view)
  - Waveform visualization (Canvas)
  - Parameter controls
  - Impulse type selector
  - Generate / Download actions
- **My Presets Page**
  - List of saved presets with search and filtering
  - Load / Edit / Delete / Export
- **Account / Settings** (minimal in MVP)

## 5. Backend Architecture

### 5.1 Project Structure (following coding conventions)

```
src/
├── routes/              # Route definitions only
├── controllers/         # Thin controllers
├── services/            # Business logic
├── models/              # Mongoose models + schemas
├── middleware/          # auth, validation, errorHandler
├── types/               # Zod schemas and DTOs
├── utils/               # Helpers (asyncHandler, getErrorMessage)
├── config/              # Environment validation
├── app.ts
└── server.ts
```

### 5.2 Layered Architecture

- **Routes** → only define endpoints and attach middleware
- **Controllers** → handle request/response, call services
- **Services** → contain business logic (e.g. `PresetService`, `AuthService`)
- **Models** → Mongoose schemas and document definitions

### 5.3 REST API Design

Base path: `/api/v1`

**Main resource groups:**

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `DELETE /api/v1/auth/account` (delete account)

- `GET    /api/v1/presets`
- `POST   /api/v1/presets`
- `GET    /api/v1/presets/:id`
- `PATCH  /api/v1/presets/:id`
- `DELETE /api/v1/presets/:id`
- `GET    /api/v1/presets/export` (download JSON)

All protected routes require a valid JWT.

## 6. Data Model

### User

```ts
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  createdAt: Date
}
```

### Preset

```ts
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: string,
  description?: string,
  tags: string[],
  impulseType: 'pure' | 'noise',
  parameters: {
    sampleRate: number,
    bitDepth: 32,
    duration: number,
    amplitude: number,
    channels: 'mono' | 'stereo',
    balance?: number,
    fadeIn: number,
    fadeOut: number
  },
  createdAt: Date,
  lastUsedAt: Date,
  usageCount: number
}
```

## 7. Authentication Flow

1. User registers → password hashed with bcrypt → user created.
2. Login → verify credentials → issue short-lived **Access Token** (JWT) + long-lived **Refresh Token** (httpOnly cookie).
3. Frontend stores Access Token in memory (or secure storage).
4. On token expiry → use Refresh Token to get new Access Token.
5. Logout → invalidate refresh token on server.

**Security notes:**

- Refresh tokens stored in httpOnly cookies.
- Access tokens have short expiry (15–30 min).
- All sensitive routes protected by authentication middleware.

## 8. Impulse Generation Flow (Client-side)

1. User adjusts parameters in UI.
2. On "Generate Preview" (or live mode) → parameters sent to `ImpulseGenerator` service.
3. Service uses `OfflineAudioContext` to generate audio buffer.
4. Buffer is converted to WAV using a lightweight WAV encoder (or `wavefile` library if needed).
5. Waveform is rendered to `<canvas>`.
6. On download → WAV file is generated and triggered via `URL.createObjectURL`.

All processing happens in the browser. No audio data is sent to the server.

## 9. Security Considerations

- Input validation on **both** frontend and backend using Zod.
- Passwords hashed with bcrypt (never stored in plain text).
- JWT secrets stored in environment variables.
- Centralized error handling middleware that does **not** leak internal details.
- CORS properly configured.
- Rate limiting on auth endpoints (recommended for MVP or post-MVP).

## 10. Deployment Considerations (High-level)

- **Frontend**: Vercel or Netlify (easy React + Vite hosting)
- **Backend**: Render, Railway, or Fly.io
- **Database**: MongoDB Atlas (free tier sufficient for MVP)
- Environment variables managed securely in hosting platform

## 11. Key Architectural Decisions & Trade-offs

| Decision                   | Chosen Approach             | Reason                                                                  |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| Where to generate impulses | Client-side (Web Audio API) | No server cost, instant download, aligns with "free to use" requirement |
| Authentication             | JWT + Refresh Tokens        | Good security vs complexity balance                                     |
| State management           | useReducer + Context        | Follows coding conventions, avoids over-engineering                     |
| Preset storage             | MongoDB                     | Flexible schema, good for metadata                                      |
| Waveform rendering         | HTML Canvas                 | Good performance and control                                            |
| API style                  | REST                        | Simple and well understood                                              |

## 12. Next Steps

1. Review and approve this architecture document.
2. Break down the PRD into user stories / tasks.
3. Begin implementation following the defined structure and conventions.

---

**End of Architecture Document v0.1**
