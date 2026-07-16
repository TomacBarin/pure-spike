# Pure Spike Studio

**A professional web application for generating high-quality Impulse Responses (IRs)**

Pure Spike Studio is a fullstack tool for music producers and sound designers. Create clean, mathematical impulse responses for convolution reverbs and transient shaping in DAWs such as Ableton Live and Logic Pro, as well as in compatible plugins like Xfer Serum 2 (via its Convolve effect).

## Features

### Core Features (MVP)

- **Impulse Generator** with professional controls:
  - Sample Rate (44.1 kHz, 48 kHz, 96 kHz, etc.)
  - Duration & Amplitude
  - Mono/Stereo with balance control
  - Fade In / Fade Out
  - Polarity (phase invert)
- **Two Impulse Types**:
  - **Pure Spike** – Clean, perfect single-sample impulse
  - **Noise Burst** – Noise burst with configurable envelope
- **Real-time Waveform Visualization** using Canvas (manual or live preview)
- **High-quality WAV Export** (32-bit float)
- **Guest Mode** – Full functionality without an account

### User Management (for logged-in users)

- Register & login (email + password)
- Save, organize, and reload **presets**
- Search, filter, edit, and delete presets
- Export all presets as JSON

## Goals

- Deliver a **polished, portfolio-ready** fullstack project
- Create a **genuinely useful tool** for the audio community
- Deepen skills in React, TypeScript, Node.js, MongoDB, and modern web development

## Tech Stack

### Frontend

- **React 19 + TypeScript + Vite**
- Web Audio API + OfflineAudioContext (all generation runs client-side)
- CSS Modules + design tokens
- React Router
- Canvas for waveform rendering

### Backend (planned)

- Node.js + Express
- MongoDB + Mongoose
- Zod for validation
- JWT + bcrypt + refresh tokens

### Design

- **Dark mode** by default with subtle gray tones and high contrast (WCAG 2.1 AA)
- Overall website aesthetic inspired by the professional marketing websites of [FabFilter](https://fabfilter.com), [Steinberg Cubase](https://steinberg.net/cubase), and [Unfiltered Audio](https://unfilteredaudio.com).
- The central Impulse Generator panel will have precise, plugin-style controls _(detailed implementation after the website shell is complete)_
- Minimal navbar: Logo + "Generator" (active) + Theme toggle + Login/Avatar

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/TomacBarin/pure-spike.git
cd pure-spike

# Install dependencies
npm install

# Start the development server (frontend)
npm run dev
```

> **Note**: Backend implementation is in progress. The frontend generator currently works standalone.

## Project Structure

```bash
pure-spike/
├── docs/                 # Documentation (PRD, architecture, etc.)
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-based folders (generator, presets, auth)
│   ├── hooks/
│   ├── pages/
│   ├── api/              # Typed API client
│   ├── types/            # Shared TypeScript types & Zod schemas
│   └── utils/
├── package.json
└── vite.config.ts
```

## Documentation

Detailed information is available in the [`/docs`](./docs/) folder:

- [`project-brief.md`](./docs/project-brief.md) – Project overview and vision
- [`prd.md`](./docs/prd.md) – Product Requirements Document
- [`architecture.md`](./docs/architecture.md) – Technical architecture
- [`user-stories.md`](./docs/user-stories.md) – User stories
- [`coding-conventions.md`](./docs/coding-conventions.md) – Coding standards
- [`quality-guidelines.md`](./docs/quality-guidelines.md) – Quality guidelines

## Current Status

The project is in **early development** (MVP in progress). Target: fully functional version by the end of August 2026.

## License

MIT License – see the [LICENSE](./LICENSE) file for details.

---

**Built for music producers and sound designers**

Questions or suggestions? Feel free to open an issue!
