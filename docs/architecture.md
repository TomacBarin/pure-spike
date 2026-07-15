# Architecture Document – Pure Spike Studio

**Version:** 0.2  
**Date:** 2026-07-15  
**Status:** Updated  
**Author:** Solution Architect (BMAD Team)  
**Based on:** PRD v0.1 + UI Layout Spec v1.1

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

- **Main Generator View** (primary page)
  - Minimal navbar (Logo + Generator + Theme + Avatar/Login)
  - Hero / Intro section
  - Central Impulse Generator panel (main focus)
  - Explanatory sections below
  - Preset management accessed from within Generator context (sidebar/modal)

- **Account Settings** (modal)

## 5. Backend Architecture

(unchanged from v0.1 – remains the same)

## 6. Data Model

(unchanged from v0.1 – remains the same)

## 7. Authentication Flow

(unchanged from v0.1 – remains the same)

## 8. Impulse Generation Flow (Client-side)

(unchanged from v0.1 – remains the same)

## 9. Security Considerations

(unchanged from v0.1 – remains the same)

## 10. Deployment Considerations (High-level)

(unchanged from v0.1 – remains the same)

## 11. Key Architectural Decisions & Trade-offs

| Decision                   | Chosen Approach             | Reason                                                                  |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| Navbar design              | Minimal (only Generator)    | Keeps focus on the tool itself, plugin-like experience                  |
| Preset management          | Integrated in Generator     | Strong plugin metaphor, fewer navigation steps                          |
| Where to generate impulses | Client-side (Web Audio API) | No server cost, instant download, aligns with "free to use" requirement |
| Authentication             | JWT + Refresh Tokens        | Good security vs complexity balance                                     |

## 12. Next Steps

1. Review and approve this architecture document.
2. Follow UI Layout Spec v1.1 for frontend implementation.
3. Break down the PRD into tasks.
4. Start coding.

---

**End of Architecture Document v0.2**