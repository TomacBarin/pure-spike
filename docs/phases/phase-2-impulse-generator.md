# Phase 2: Impulse Generator + Waveform Visualization

**Version:** 0.2  
**Date:** 2026-08-03  
**Status:** Ready for implementation  
**Phase Goal:** Implement the complete client-side Impulse Generator so users can configure parameters, preview the waveform on a clear canvas, and download high-quality 32-bit float WAV files — both as guests and (later) as logged-in users. The generator must feel professional, minimal, and responsive.

---

## 1. Overview & Goals

**Purpose of Phase 2**  
Turn the current GeneratorPanel placeholder into a fully working, professional tool. All audio generation and file creation happens **client-side** using the Web Audio API (`OfflineAudioContext`). No server involvement for generation or download.

This phase covers **Epic 1 (Impulse Generator)** and **Epic 2 (Waveform Visualization)** from the user stories.

**Goals for this phase:**

- Deliver a clean, testable core generation engine (pure functions first)
- Support two impulse types in MVP: **Pure Spike** and **Noise Burst**
- Provide a professional, plugin-inspired parameter UI with sensible defaults and “Reset to Defaults”
- Render a clear waveform preview on `<canvas>`
- Allow manual “Generate Preview” + optional Live Preview mode
- Export high-quality 32-bit float WAV files with sensible automatic filenames
- Make the entire generator panel **responsive** and consistent with the existing design system
- Follow `coding-conventions.md` strictly (Core / Adapter / UI separation, `useReducer` + discriminated unions, CSS Modules, accessibility)

**Success Criteria:**

- A guest can open the page, tweak parameters, see a waveform, and download a working WAV
- Pure Spike behaves exactly like the original PureIR concept (single sample impulse)
- Noise Burst produces a usable short noise envelope
- The generator looks and feels like a natural part of the existing site (not a bolted-on form)
- The layout adapts cleanly from wide desktop to narrower viewports
- The code is easy to reason about, test, and extend later

---

## 2. Technical Approach (High Level)

### 2.1 Architecture Principles

- **Core** (platform-agnostic): pure functions that take parameters → return `Float32Array` / `AudioBuffer` data. No React, no DOM.
- **Adapter**: thin utilities that turn core data into WAV blobs, trigger downloads, draw on canvas.
- **UI**: React components + custom hooks that own state and call the core/adapter layer.

### 2.2 Key Technologies

| Concern       | Technology / Approach                                  |
| ------------- | ------------------------------------------------------ |
| Generation    | `OfflineAudioContext` + manual buffer filling          |
| Waveform      | HTML `<canvas>` (2D context)                           |
| WAV encoding  | Lightweight pure-JS encoder (or small dependency)      |
| State         | `useReducer` + discriminated unions                    |
| Parameters UI | Existing `Slider`, `Select`, `Input`, `Button`, `Card` |
| Live preview  | Debounced updates (performance-safe)                   |
| Layout        | CSS Grid + Flexbox, desktop-first, design tokens       |

### 2.3 Impulse Types (MVP)

1. **Pure Spike**  
   Exactly one non-zero sample (amplitude) at the very beginning. Rest is silence. Matches the original PureIR design.

2. **Noise Burst**  
   Short burst of white noise shaped by the fade-in / fade-out envelope and overall amplitude.

Bit depth is **locked to 32-bit float** in MVP.

---

## 3. Parameter Model

### 3.1 Parameters (shared)

| Parameter     | Type                      | Notes / Constraints                            | Default (suggested)          |
| ------------- | ------------------------- | ---------------------------------------------- | ---------------------------- |
| `impulseType` | `'pure' \| 'noise'`       | Switches available controls                    | `'pure'`                     |
| `sampleRate`  | `44100 \| 48000 \| 96000` | Common professional rates                      | `48000`                      |
| `duration`    | number (seconds)          | e.g. 0.01 – 5.0                                | `1.5` (Pure) / `0.1` (Noise) |
| `amplitude`   | number                    | -1.0 – 1.0 (allows polarity invert)            | `1.0`                        |
| `channels`    | `'mono' \| 'stereo'`      |                                                | `'mono'`                     |
| `balance`     | number                    | -1 (left) → 1 (right). Only relevant in stereo | `0`                          |
| `fadeIn`      | number (seconds)          | 0 – duration                                   | `0`                          |
| `fadeOut`     | number (seconds)          | 0 – duration                                   | `0`                          |

**Bit depth** is hardcoded to 32-bit float and not exposed in the UI.

### 3.2 Type-dependent behaviour

- **Pure Spike**: duration mainly controls file length / headroom. Fade controls are less critical but still applied if > 0.
- **Noise Burst**: duration is the length of the noise itself. Fades are important for a clean envelope.

Parameters that become less relevant for the current type should be **visually disabled** (with a short explanation) rather than completely hidden.

---

## 4. Generator UI Layout & Responsiveness

This is a core part of Phase 2. The generator must feel intentional and professional, not like a generic form dumped into a card.

### 4.1 Design Philosophy

- **Waveform is the hero** inside the panel.
- Parameters are secondary but clearly grouped and easy to scan.
- Generous spacing and clear visual hierarchy (same design language as the rest of the site).
- Plugin-inspired but adapted for the web (not as dense as desktop plugins).
- Fully responsive using the same desktop-first approach as the existing shell.
- Heavy reuse of existing design tokens, `Card`, `Slider`, `Select`, `Input` and `Button`.

### 4.2 Recommended Layout Structure (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│  Impulse Type selector (Pure Spike | Noise Burst)               │
│  + Live Preview toggle (right side)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    WAVEFORM CANVAS (large)                      │
│                                                                 │
├───────────────────────────────┬─────────────────────────────────┤
│  Time & Format                │  Level & Stereo                 │
│  • Sample Rate                │  • Amplitude                    │
│  • Duration                   │  • Channels                     │
│                               │  • Balance (when stereo)        │
├───────────────────────────────┴─────────────────────────────────┤
│  Envelope                                                       │
│  • Fade In                                                      │
│  • Fade Out                                                     │
├─────────────────────────────────────────────────────────────────┤
│  [Reset to Defaults]               [Generate Preview] [Download]│
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Responsive Behaviour

- **Wide screens (> ~1000px)**  
  Two-column parameter layout under the waveform. Waveform takes significant vertical space.

- **Medium screens (~700–1000px)**  
  Parameter groups start stacking or become single-column. Waveform height reduces slightly but remains prominent.

- **Narrow screens (< ~700px)**  
  Everything stacks vertically in a single column.  
  Waveform keeps a usable height.  
  Controls remain full-width and touch-friendly.  
  Action buttons stack or wrap cleanly.

Use CSS Grid / Flexbox with the project’s existing breakpoints and design tokens. Avoid fixed pixel widths for the panel itself — rely on `max-width` + consistent padding like the rest of the page.

### 4.4 Visual Details

- Reuse the existing elevated `Card` style for the whole generator panel.
- Group related parameters with subtle section titles or light dividers.
- Clear disabled styling when a parameter is not relevant for the current impulse type.
- Action buttons should have strong visual hierarchy (primary = Download / Generate, secondary/ghost = Reset).
- Live Preview toggle should be discrete but always visible.
- Maintain the same accent color (`#2dd4bf`), border treatment, and spacing scale as the rest of the site.

### 4.5 Implementation Note

We do **not** try to design every pixel before writing code.  
We implement the layout structure early (during Step 6) using the principles above, then refine spacing, grouping and responsive behaviour while we wire up the real state and generation logic.

---

## 5. Folder & File Structure (additions)

```
src/
├── features/
│   └── generator/
│       ├── GeneratorPanel.tsx              # Main UI container
│       ├── GeneratorPanel.module.css
│       ├── components/
│       │   ├── ImpulseTypeSelector.tsx
│       │   ├── ParameterControls.tsx
│       │   ├── WaveformCanvas.tsx
│       │   └── ActionBar.tsx               # Reset / Generate / Download
│       ├── hooks/
│       │   └── useImpulseGenerator.ts
│       ├── core/                           # Pure logic (no React)
│       │   ├── types.ts
│       │   ├── defaults.ts
│       │   ├── generatePureSpike.ts
│       │   ├── generateNoiseBurst.ts
│       │   └── applyEnvelope.ts
│       └── utils/
│           ├── encodeWav.ts
│           ├── downloadBlob.ts
│           └── drawWaveform.ts
```

Keep the generator feature self-contained.

---

## 6. Step-by-Step Implementation Plan

### Step 1: Types, Defaults & Constraints

- Create `core/types.ts` and `core/defaults.ts`.
- Define validation / clamping helpers.

### Step 2: Core Generation – Pure Spike

- Implement `generatePureSpike(params)`.
- Support mono + stereo with balance.
- Verify against original PureIR behaviour.

### Step 3: Core Generation – Noise Burst + Envelope

- White noise generation + `applyEnvelope`.
- Combine into `generateNoiseBurst(params)`.

### Step 4: WAV Encoding & Download

- 32-bit float WAV encoder.
- `downloadBlob` helper + automatic sensible filenames.

### Step 5: State Management

- `useReducer` with discriminated unions.
- Actions for parameters, type switching, reset, preview mode.

### Step 6: Parameter Controls + Layout Structure

- Replace the placeholder in `GeneratorPanel`.
- Implement the layout described in section 4 (Grid/Flex + responsive).
- Wire the existing UI components into the parameter groups.
- Add Impulse Type selector and Live Preview toggle.

### Step 7: Waveform Canvas

- `WaveformCanvas` component.
- Simple, clear amplitude drawing.
- High-DPI and resize handling.

### Step 8: Orchestrating Hook + Live Preview

- `useImpulseGenerator` that connects state → core → canvas + download.
- Manual preview (default) + debounced Live Preview.

### Step 9: Polish, Accessibility & Edge Cases

- Keyboard support, labels, ARIA, focus states.
- Clear disabled states and helper text.
- Performance safeguards for long durations.
- Final visual polish against the design system.
- Test dark + light themes and different viewport widths.

---

## 7. Acceptance Criteria for Phase 2

- [ ] User can select Pure Spike or Noise Burst
- [ ] All parameters are controllable and have sensible defaults
- [ ] “Reset to Defaults” works
- [ ] Waveform updates correctly (manual + live)
- [ ] Downloaded WAV is valid 32-bit float with correct sample rate, channels and duration
- [ ] Pure Spike matches original PureIR behaviour
- [ ] Noise Burst produces a clean usable burst
- [ ] Layout follows the structure in section 4 and is responsive
- [ ] Guest mode works completely
- [ ] Code follows coding conventions and is accessible
- [ ] No console errors; works in major browsers

---

## 8. Risks & Considerations

- **Performance**: Live preview on long durations or high sample rates can be expensive → aggressive debouncing + soft limits.
- **Browser differences**: Test `OfflineAudioContext` and WAV encoding in Chromium, Firefox and Safari.
- **Layout complexity**: Keep the responsive rules simple. Prefer stacking over clever multi-column tricks on small screens.
- **Scope creep**: Do not add audio playback, more impulse types, or any backend features in this phase.
- **File size**: Very long durations at 96 kHz stereo create large files — consider a soft upper limit or warning.

---

## 9. Out of Scope for Phase 2

- User authentication and preset saving/loading
- Backend API
- Audio playback inside the browser
- Additional impulse types (Sine Sweep etc.)
- Advanced noise colours beyond basic white noise
- Complex mobile-specific optimisations beyond solid responsiveness

---

## 10. Next Phase Preview

After Phase 2 is stable and merged:

**Phase 3: Authentication + Preset Management**

- Backend (Express + MongoDB + JWT)
- Register / Login / Logout
- Save / Load / Edit / Delete presets from within the Generator context
- JSON export of all presets
- Account deletion

---

**End of Phase 2 Document v0.2**
