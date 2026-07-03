# Phase 1: Project Foundation & Basic Layout

**Version:** 0.1  
**Date:** 2026-07-03  
**Status:** Draft  
**Phase Goal:** Create a stable, professional, and well-structured foundation for Pure Spike Studio so that all future development has a clear and maintainable home.

---

## 1. Overview & Goals

**Purpose of Phase 1**  
Build the structural and visual foundation of the application before implementing core features (Generator + Waveform). This gives us a stable "container" to work inside and reduces the risk of major refactoring later.

**Goals for this phase:**

- Establish a clean and scalable folder structure according to `coding-conventions.md`
- Set up a professional design system (design tokens + theming)
- Create a plugin-inspired main layout (waveform on top, parameters below, presets sidebar)
- Implement dark mode as default with subtle gray tones and good contrast
- Create reusable base components with accessibility in mind
- Make the layout responsive (desktop-first)

**Success Criteria:**

- The application has a clear, professional visual identity.
- The layout feels like a serious audio tool.
- The project structure is easy to navigate and extend.
- Dark mode works well and follows the quality guidelines.

---

## 2. Folder Structure

Follow the conventions in `coding-conventions.md`. Recommended structure for Phase 1:

```ts
src/
├── components/           # Reusable UI components (Button, Input, Slider, Card, etc.)
├── layouts/              # Layout components (MainLayout, GeneratorLayout, etc.)
├── features/             # Feature folders (will grow later: generator, presets, auth)
├── hooks/                # Custom hooks (useTheme, useLocalStorage, etc.)
├── styles/               # Global styles + design tokens
│   ├── globals.css
│   └── tokens.ts         # Design tokens as TypeScript object + CSS variables
├── types/                # Shared types and interfaces
├── utils/                # Helper functions
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

**Note:** We will expand `features/` later when we implement the Generator and Presets.

---

## 3. Design System & Tokens

Create a simple but solid design system from the start.

### Recommended tokens (in `src/styles/tokens.ts`)

```ts
export const tokens = {
  colors: {
    background: {
      primary: "#1a1a1f", // ~5-7% gray dark
      secondary: "#25252b",
      elevated: "#2f2f36",
    },
    text: {
      primary: "#f0f0f5",
      secondary: "#b0b0b8",
      muted: "#8a8a92",
    },
    accent: "#4a9eff", // Subtle blue accent (can be adjusted)
    border: "#3a3a42",
    success: "#4ade80",
    error: "#f87171",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },
  fontSize: {
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },
} as const;
```

Expose these as CSS variables in `globals.css` so they can be used in both CSS Modules and inline styles.

---

## 4. Main Layout

**Design goal:** Plugin-inspired layout (inspired by Serum, FabFilter, Cubase).

**Recommended structure:**

- **Top bar / Header** — Logo + Dark/Light toggle + (later) User info
- **Main content area**
  - Waveform visualization (large, prominent)
  - Parameter controls below the waveform
- **Right sidebar** (or bottom on smaller screens) — Presets panel
  - When not logged in: Slightly blurred + text "Log in to save and load presets"

This layout should be built as a reusable `MainLayout` component.

---

## 5. Core Components to Create in Phase 1

Prioritized order:

1. **Design tokens + global styles**
2. **Button** component (with variants: primary, secondary, ghost)
3. **Input** / **NumberInput** / **Slider** (controlled)
4. **Select** dropdown
5. **Card** or **Panel** component
6. **MainLayout** component
7. **ThemeProvider** + `useTheme` hook (dark mode toggle)
8. Basic **Header** and **Sidebar** components

All components should follow accessibility best practices (labels, keyboard navigation, ARIA where needed).

---

## 6. Theming & Dark Mode

- Dark mode should be **default**.
- Use CSS variables for theming so switching theme is easy later.
- Store user preference in `localStorage` (via a `useTheme` hook).
- Subtle grays instead of pure black/white, with good contrast (WCAG AA).

---

## 7. Step-by-Step Implementation Plan

### Step 1: Project Structure

- Create the folders listed in section 2.
- Move/create `tokens.ts` and `globals.css`.

### Step 2: Design Tokens & Styling

- Define tokens in TypeScript.
- Set up CSS variables in `globals.css`.
- Apply basic global styles (body, typography, etc.).

### Step 3: Theme System

- Create a simple `ThemeProvider` + `useTheme` hook.
- Add a toggle button in the header.

### Step 4: Base Components

- Build `Button`, `Input`, `Slider`, `Select` as controlled components.
- Make them look professional and minimal.

### Step 5: Main Layout

- Create `MainLayout` component with the plugin-style structure.
- Make it responsive (sidebar can collapse or move below on smaller screens).

### Step 6: Polish & Accessibility

- Ensure good contrast.
- Add proper labels and keyboard support.
- Test that the layout feels clean and intentional.

---

## 8. Acceptance Criteria for Phase 1

- The application starts with a professional dark theme.
- The main layout follows the plugin-inspired structure.
- Design tokens are defined and used consistently.
- Basic reusable components exist and are accessible.
- The layout is responsive (works well on different desktop widths).
- The project structure is clean and follows the coding conventions.

---

## 9. Risks & Considerations

- Avoid over-engineering the design system in Phase 1. Keep it simple but extensible.
- Do not implement Generator logic or audio yet — focus only on structure and visuals.
- Make sure the layout has enough space for the waveform and parameters so it doesn’t feel cramped later.

---

## 10. Next Phase Preview

After Phase 1 is complete and stable, we will move to:

**Phase 2: Impulse Generator + Waveform Visualization**

This is where the real core functionality begins.

---

**End of Phase 1 Document v0.1**
