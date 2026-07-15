# UI Layout Specification – Pure Spike Studio

**Version:** 1.1 (Updated)  
**Date:** 2026-07-15  
**Status:** Approved  
**Author:** BMAD UX Expert (Sally)  
**Changes in v1.1:** Navbar simplified. Preset management moved into Generator context (hybrid plugin-like approach).

---

## 1. Overall Page Philosophy

- Clean, minimalist, professional audio-tool aesthetic.
- Dark mode by default.
- Simple navigation.
- Strong focus on the Generator as the main tool.
- Clear separation between Guest and Logged-in experiences.
- All text in English.

---

## 2. Page Structure (Main View)

### 2.1 Sticky Navbar

**Always visible and minimal.**

| Element      | Guest view               | Logged-in view     | Notes                                     |
| ------------ | ------------------------ | ------------------ | ----------------------------------------- |
| Logo + Name  | "Pure Spike Studio"      | Same               | Click → scroll to top                     |
| Navigation   | Generator (active)       | Generator (active) | Very clean – no other top-level nav items |
| Theme Toggle | Yes                      | Yes                | Already implemented                       |
| Right side   | Login / Register buttons | Avatar dropdown    | See 2.1.1                                 |

#### 2.1.1 Avatar Dropdown (Logged-in only)

- **Account Settings** (opens modal)
- Logout

---

### 2.2 Hero / Intro Section

Placed directly below navbar, above the Generator panel.

**Headline**  
`Pure Spike Studio`

**Subheadline**  
`Generate pristine impulse responses for convolution reverbs and transient shaping in your DAW.`

**Supporting text**  
`Free to use as a guest. Create a free account to save and manage your presets.`

**Primary CTA (optional)**  
Large button: **"Start Generating"** (smooth scroll to Generator section)

---

### 2.3 Main Content Area – The Studio

Contains the **Impulse Generator** as the primary, prominent module.

**Note:** The Generator is treated as a self-contained module. All preset-related functionality for logged-in users is accessed from within this area (see 2.3.1).

#### 2.3.1 Preset Management (Logged-in users only)

Preset handling is integrated into the Generator context (plugin-like experience).

**How it works:**

- When logged in, the Generator panel/area contains a clear entry point (button or section) labeled **"Presets"**.
- Clicking it opens a **sidebar** or **modal/drawer** containing:
  - Search and filter
  - List of saved presets
  - Actions: Load into current generator, Edit, Delete
  - Prominent button: **"Export all presets as JSON"**

This keeps the user inside the generator workflow and avoids a separate top-level "Presets" page in the navbar.

**JSON Export behavior:**

- Downloads a single `.json` file with all user presets + metadata.
- Suggested filename: `pure-spike-presets-YYYY-MM-DD.json`

---

### 2.4 Explanatory Sections

Placed below the Generator panel. Use a responsive card grid.

#### What is Pure Spike Studio?

Pure Spike Studio lets you instantly generate high-quality impulse responses (IRs) for use in convolution reverbs and transient shaping tools in your DAW. Choose between clean Pure Spike impulses or configurable Noise Bursts.

#### Who is it for?

Music producers and sound designers who need fast, professional-grade impulse responses without complicated setup. Perfect for convolution reverbs and transient shaping in DAWs and plugins such as Ableton Live and Xfer Serum 2.

#### How to use it

1. Adjust the parameters in the generator.
2. Preview the waveform.
3. Export as high-quality 32-bit WAV.
4. (Optional) Create a free account to save your settings as presets.

#### Guest vs Account

- **Guest** — Full access to the generator. Generate and export impulses instantly. No signup required.
- **Free Account** — Save, organize, reload, and export your presets. All your impulses in one place.

---

## 3. User Flows Summary

### Guest Flow

1. Land on page → Optional short intro
2. Use Generator directly
3. Export WAV
4. See account benefits in explanatory sections

### Logged-in Flow

1. Land on Generator (main focus)
2. Use Generator + access **Presets** directly from within the Generator area (sidebar/modal)
3. Load, save, edit, delete presets without leaving the generator context
4. Access **Account Settings** via avatar dropdown (for Delete Account etc.)

---

## 4. Account Settings Modal

**Opened from:** Avatar dropdown → **Account Settings**

**Structure:**

**Account Information**

- Email
- Account created
- Number of saved presets

**Danger Zone** (visually separated, warning style)
**Warning text:**

> Deleting your account is permanent. All your saved presets will be permanently removed and cannot be recovered.

**Button:**  
**Delete Account** (destructive/red style)

On click → Confirmation modal (recommended: type `DELETE` + password confirmation).

---

## 5. Technical & Implementation Notes (High-level)

- Navbar is intentionally minimal.
- Preset management lives inside the Generator context (sidebar or modal) to maintain a plugin-like feel.
- Account Settings remains a modal (keeps user in context).
- Generator is kept as an isolated module.
- Explanatory sections are static content below the main tool.

---

## 6. Out of Scope for This Document

- Internal design and controls of the Impulse Generator panel itself
- Exact component implementation and spacing
- Backend/API details

---

**End of document (v1.1)**
