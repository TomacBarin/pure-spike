# User Stories – Pure Spike Studio

**Version:** 0.2  
**Date:** 2026-07-15  
**Status:** Updated  
**Source:** PRD + UI Layout Spec v1.1

---

## Epic 1: Impulse Generator (Core) – **Highest Priority (MVP)**

**AS-1.1** As a user I want to configure impulse parameters so that I can create custom impulses.  
**Acceptance Criteria:**

- Parameters: Sample Rate, Bit Depth (32-bit float), Duration, Amplitude, Channels (Stereo/Mono + Balance), Fade In/Out.
- Professional default values are set on first visit.
- "Reset to Defaults" button restores all parameters.
- Parameters will be disabled based on selected impulse type with clear message.

**AS-1.2** As a user I want to choose between different impulse types.  
**Acceptance Criteria:**

- Available types in MVP: Pure Spike and Noise Burst.
- Clear selector in UI.
- Switching type may disable/enable relevant parameters.

**AS-1.3** As a user I want to generate and download a WAV file.  
**Acceptance Criteria:**

- Generation happens client-side using Web Audio API + OfflineAudioContext.
- Export locked to 32-bit float WAV in MVP.
- Automatic filename (e.g. `PureSpike_Pure_48000_500ms.wav`).
- Works in Guest mode.

---

## Epic 2: Waveform Visualization & Preview – **High Priority (MVP)**

**AS-2.1** As a user I want to see a waveform preview of the impulse.  
**Acceptance Criteria:**

- Uses HTML Canvas.
- Clear, representative visualization (time + amplitude).
- Updates correctly when parameters change.

**AS-2.2** As a user I want control over preview generation.  
**Acceptance Criteria:**

- Default: Manual "Generate Preview" button.
- Optional toggle: "Live Preview" that updates automatically.
- Performance remains acceptable in both modes.

---

## Epic 3: User Authentication – **Medium Priority (MVP)**

**AS-3.1** As a visitor I want to register an account.  
**Acceptance Criteria:**

- Email + password registration.
- Password validation (min 8 chars, 1 letter + 1 number).
- Clear success/error messages.

**AS-3.2** As a user I want to log in and log out.  
**Acceptance Criteria:**

- Secure JWT-based authentication with refresh tokens.
- Session works across page reloads.
- Proper error messages (without leaking sensitive info).

**AS-3.3** As a logged-in user I want to stay authenticated.  
**Acceptance Criteria:**

- Refresh token mechanism works.
- Logout clears session properly.

---

## Epic 4: Preset Management – **Medium Priority (MVP)**

**AS-4.1** As a logged-in user I want to save a preset.  
**Acceptance Criteria:**

- Saves all current parameters + impulse type + name, description, tags.
- Clear success message.

**AS-4.2** As a logged-in user I want to view and manage my presets from within the Generator.  
**Acceptance Criteria:**

- Access via sidebar or modal inside Generator context.
- List of presets with search (name) and tag filtering.
- Load preset (populates generator).
- Edit name/description/tags.
- Delete preset.

**AS-4.3** As a logged-in user I want to export all my presets.  
**Acceptance Criteria:**

- "Export all presets as JSON" button available in preset management area.
- Downloads a single JSON file with all presets and metadata.

---

## Epic 5: Account Management – **Medium Priority (MVP)**

**AS-5.1** As a logged-in user I want to delete my account.  
**Acceptance Criteria:**

- Accessible via Avatar dropdown → Account Settings.
- Confirmation dialog with clear warning ("Delete Account" in Danger Zone).
- Deletes user and all associated presets.
- User is logged out after deletion.

---

## Epic 6: UI, Layout & Accessibility – **Medium Priority (MVP)**

**AS-6.1** As a user I want a professional and minimalist interface.  
**Acceptance Criteria:**

- Dark mode by default with subtle grays.
- Minimal navbar (Logo + Generator + Theme + Avatar/Login).
- Plugin-inspired layout with Generator as the main focus.
- High contrast and WCAG 2.1 AA compliance.

**AS-6.2** As a user I want the interface to work on different screen sizes.  
**Acceptance Criteria:**

- Responsive design (desktop-first).

**AS-6.3** As a user I want clear feedback on all actions.  
**Acceptance Criteria:**

- Loading states, success messages, and error messages follow quality guidelines.

---

## Prioritization (MVP)

**MVP (must be completed):**

- Epic 1 + Epic 2 (Generator + Waveform)
- Epic 3 (Authentication)
- Epic 4 (Preset Management – basic, integrated in Generator)
- Epic 6 (UI/Layout basics)

**Nice-to-have within MVP:**

- Full preset export (AS-4.3)
- Account deletion (AS-5.1)
- Live Preview toggle

---

## Next Steps After This Document

1. Approve / adjust user stories.
2. Decide on implementation order.
3. Create tasks / issues for each story.
4. Start coding following the UI Layout Spec v1.1.

---

**End of User Stories v0.2**