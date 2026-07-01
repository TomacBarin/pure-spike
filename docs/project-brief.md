# Project Brief – Pure Spike Studio

**Version:** 0.1  
**Date:** 2026-07-01  
**Status:** Draft  
**Author:** BMAD Analyst (in collaboration with Tomac Barin Jansson)  
**Project Type:** Greenfield Fullstack

---

## 1. Project Overview

**Pure Spike Studio** is a free, professional-grade web application for generating high-quality impulse responses (IRs). The IRs are intended for use in convolution reverbs and transient shaping within DAWs such as Ableton Live and Logic Pro, as well as in compatible plugins like Xfer Serum 2 (via its Convolve effect).

The application allows users to configure various parameters to create custom impulses and download them instantly as WAV files. While basic usage requires no account, registered users can save, organize, and quickly reload their favorite presets.

### Primary Goals

1. **Portfolio Project** — Create a polished, production-ready fullstack application that demonstrates strong skills in React, TypeScript, Node.js, MongoDB, and modern web development practices.
2. **Learning & Repetition** — Reinforce and deepen knowledge gained during the first year of fullstack studies (React, TypeScript, Node.js, MongoDB, etc.).
3. **Useful Tool** — Deliver a genuinely useful tool for music producers and sound designers.

---

## 2. Target Users

- **Primary users**: Music producers, sound designers, and electronic musicians who work with convolution reverbs and transient shaping.
- **Secondary users**: Students and hobbyists interested in audio processing and impulse responses.
- Users range from beginners (who just want good defaults) to more experienced users who want fine-grained control.

---

## 3. Core Features (MVP Scope)

### 3.1 Impulse Generator

Users can configure and generate impulses with the following parameters:

- Sample Rate (e.g. 44.1 kHz, 48 kHz, 96 kHz)
- Bit Depth (24-bit, 32-bit float)
- Duration / Length
- Amplitude / Gain
- Stereo / Mono mode (+ balance control)
- Polarity (phase invert)
- Fade In / Fade Out (envelope shaping)

**Requirements:**

- Strong, sensible default values on first visit
- "Reset to Defaults" button
- Real-time waveform visualization/preview before download
- High-quality export as WAV file (32-bit float recommended)

### 3.2 Impulse Types (v1)

- **Pure Spike** — Clean, mathematical single-sample impulse (original PureIR concept)
- **Noise Burst** — White or pink noise burst with configurable envelope

Additional types (e.g. Sine Sweep) are planned for future versions.

### 3.3 Download & Guest Experience

- Full functionality available without creating an account (Guest mode)
- Instant download of generated impulse as `.wav` file
- No server-side generation required for basic use

### 3.4 User Accounts & Preset Management (Backend)

Registered users can:

- Create an account (email + password)
- Save generated impulses as named presets
- Add a description and tags to presets
- View, load, and delete saved presets
- Quickly regenerate impulses from saved presets

Security is a high priority. The application must follow modern authentication and data protection best practices.

### 3.5 Design & User Experience

- Professional, minimalist, and clean interface (inspired by Cubase, FabFilter, Unfiltered Audio, and Blender)
- Dark mode enabled by default
- Subtle gray tones instead of pure black/white for a more refined look
- High visual contrast following WCAG 2.1 AA accessibility standards
- Clear feedback, helpful defaults, and intuitive controls

---

## 4. Non-Functional Requirements

- **Accessibility**: WCAG 2.1 Level AA compliance
- **Performance**: Fast generation and preview even for longer impulses
- **Security**: Secure authentication (JWT + bcrypt), input validation (Zod), and protection against common web vulnerabilities
- **Code Quality**: Follow the project's `coding-conventions.md` and `quality-guidelines.md` strictly

---

## 5. Technical Approach (High Level)

### Frontend

- React + TypeScript + Vite
- React Router for navigation
- CSS Modules + design tokens
- Web Audio API + `OfflineAudioContext` for client-side impulse generation and waveform preview

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Zod for validation
- JWT + bcrypt for authentication

**Note**: All impulse generation and file creation happens client-side. The backend is primarily responsible for user authentication and preset storage.

---

## 6. Out of Scope (for MVP)

- Public preset sharing / community features
- Advanced impulse types (Sine Sweep, etc.)
- Audio playback inside the browser (beyond waveform preview)
- Mobile app / React Native version
- Payment / subscription model

These features may be considered in future iterations after the MVP is complete.

---

## 7. Success Criteria

By the end of August 2026, the following should be achieved:

- A fully functional MVP where users can generate, preview, and download impulses without an account
- Working user registration, login, and preset saving/loading functionality
- Professional-looking, accessible, and minimalist user interface
- Clean, well-structured codebase that follows the defined coding conventions and quality guidelines
- The project is suitable to be shown in a portfolio

---

## 8. Timeline & Constraints

- **Target completion**: End of August 2026
- Developer availability: Approximately 3–4 hours per weekday
- The developer will write all production code. BMAD team provides planning, architecture guidance, code reviews, and technical advice.

---

## 9. Next Steps

1. Review and approve this Project Brief
2. Create detailed **Product Requirements Document (PRD)**
3. Define **Fullstack Architecture**
4. Break down work into user stories and begin development

---

**End of Project Brief**
