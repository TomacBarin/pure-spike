# Product Requirements Document (PRD) – Pure Spike Studio

**Version:** 0.2  
**Date:** 2026-07-15  
**Status:** Updated  
**Author:** PM (BMAD Team)  
**Based on:** Project Brief v0.2 + UI Layout Spec v1.1

---

## 1. Introduction

Pure Spike Studio is a free, professional-grade web application that allows users to generate high-quality impulse responses (IRs) for use in convolution reverbs and transient shaping in DAWs and plugins such as Ableton Live, Logic Pro, and Xfer Serum 2.

The application supports both guest usage (full generation and download without an account) and registered users who can save, manage, and reuse presets.

## 2. Product Goals

- Deliver a polished, portfolio-ready fullstack application by the end of August 2026.
- Provide a genuinely useful tool for music producers and sound designers.
- Allow the developer to practice and demonstrate skills in React, TypeScript, Node.js, MongoDB, authentication, and clean architecture.
- Maintain a professional, minimalist, and accessible user experience with a clean, plugin-like interface.

## 3. Target Users

- Music producers and sound designers working with convolution reverbs and transient shaping.
- Users who want quick, high-quality impulses without complex setup.
- Both guest users (one-time use) and returning users who want to save presets.

## 4. Functional Requirements

### 4.1 Impulse Generator

- Users can configure the following parameters:
  - Sample Rate
  - Bit Depth (locked to 32-bit float in MVP)
  - Duration
  - Amplitude
  - Channels (Stereo/Mono + Balance)
  - Fade In / Fade Out
- Two impulse types available in MVP:
  - **Pure Spike**
  - **Noise Burst**
- Some parameters are disabled depending on the selected impulse type, with clear user feedback.
- Strong, professional default values with a **"Reset to Defaults"** button that restores all parameters to their initial state.
- High-quality WAV export (32-bit float).

### 4.2 Waveform Visualization

- Visual waveform preview of the generated impulse.
- The visualization uses `<canvas>` and provides a clear and representative view of the impulse.
- Users can choose between:
  - Manual **"Generate Preview"** mode (default)
  - **"Live Preview"** mode (optional toggle)
- The visualization should feel professional without excessive complexity.

### 4.3 Guest Experience

- Full access to impulse generation, preview, and download without creating an account.
- No data is stored for guest users.

### 4.4 User Accounts & Authentication

- Users can register and log in using email and password.
- Password requirements: Minimum 8 characters, at least one letter and one number.
- JWT-based authentication with short-lived access tokens + refresh tokens (httpOnly).
- Logged-in users can access preset management and account settings.

### 4.5 Preset Management

- Logged-in users can save, name, describe, and tag presets.
- Presets include the following metadata: `createdAt`, `lastUsedAt`, and `usageCount`.
- Users can view, load, edit, and delete their saved presets.
- Search functionality on preset name and tags is available.
- Users can export all their presets as a downloadable JSON file.

**UI Placement**: Preset management is accessed from within the Generator panel/context (via sidebar or modal), not as a separate top-level navigation item. This maintains a strong plugin-like user experience.

### 4.6 Account Management

- Logged-in users can permanently delete their account.
- Account deletion removes the user and all associated presets.
- Deletion requires confirmation and clear communication of consequences.
- Accessible via Avatar dropdown → Account Settings modal (with Danger Zone section).

### 4.7 User Interface & Design

- Professional, minimalist design inspired by tools such as Cubase, FabFilter, and Unfiltered Audio.
- Dark mode enabled by default with subtle gray tones and high contrast (WCAG 2.1 AA).
- **Minimal navbar**: Logo + "Generator" (active/clickable) + Theme toggle + Avatar/Login buttons.
- Primary focus on the central Impulse Generator panel.
- Explanatory sections (What it is, Who it's for, How to use, Guest vs Account) placed below the Generator.
- The interface is responsive and adapts to different screen widths (desktop-first).

## 5. Non-Functional Requirements

- **Accessibility**: Follow WCAG 2.1 Level AA guidelines (as defined in `quality-guidelines.md`).
- **Performance**: Generation and preview should feel fast and responsive.
- **Security**: Follow secure authentication practices, input validation with Zod, and proper error handling (never leak sensitive information to the client).
- **Code Quality**: Strictly follow `coding-conventions.md` and `quality-guidelines.md`.
- **Reliability**: Clear feedback on all user actions (success, loading, and error states).

## 6. Data Requirements

### Preset Document (MongoDB)

- name
- description
- tags (array)
- all impulse parameters
- impulse type
- createdAt, lastUsedAt, usageCount
- userId (reference)

### User Document

- email
- password (hashed)
- createdAt
- (presets stored as separate documents with reference to user)

## 7. Scope

### In Scope (MVP)

- Full impulse generation and download (guest + logged in)
- Waveform preview with optional live mode
- User registration, login, and logout
- Preset saving, loading, editing, searching, and JSON export (integrated in Generator context)
- Account deletion via Account Settings
- Professional minimalist UI with minimal navbar and dark mode default
- Responsive design

### Out of Scope (MVP)

- Public preset sharing
- Additional impulse types (e.g. Sine Sweep)
- Audio playback inside the browser
- Advanced account features (password reset via email, profile editing)
- Analytics or usage statistics

## 8. Success Metrics

- A fully working MVP is complete and usable by end of August 2026.
- The application feels professional and pleasant to use with a clean, plugin-like flow.
- The codebase follows the defined coding conventions and quality standards.
- The project is suitable for a portfolio presentation.

## 9. Assumptions & Risks

- All impulse generation happens client-side using the Web Audio API.
- The backend is used primarily for authentication and preset storage.
- The developer will implement all features while following the agreed conventions.

## 10. Open Questions

- Exact visual design details and component styling will be refined during implementation.
- Exact error message wording will be defined during development.

---

**End of PRD Draft v0.2**