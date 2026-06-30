# Quality Guidelines – Pure Spike Studio

## 1. Introduction

This document defines the quality standards we follow when building Pure Spike Studio.  
It complements `coding-conventions.md` by focusing on **user experience, accessibility, security, and performance** rather than code style.

The goal is to build a product that is:

- Usable by as many people as possible (Accessibility)
- Pleasant and predictable to use (User Experience)
- Reasonably secure (Security)
- Feels fast and responsive (Performance)

These guidelines are living documents. We will update them as the project evolves (especially when authentication and preset saving are added).

---

## 2. Accessibility (WCAG)

### Goal

We aim to follow **WCAG 2.1 Level AA** as a baseline.  
Accessibility is not an afterthought — it is part of building a professional and inclusive product.

Pure Spike Studio should be usable by as many people as possible, including those using keyboards, screen readers, or with reduced vision.

### Core Principles (WCAG)

| Principle          | Meaning                                                          | Relevance for Pure Spike Studio                                     |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Perceivable**    | Information must be presentable in ways users can perceive       | Waveform visualization, parameter values, status messages           |
| **Operable**       | Users must be able to operate the interface                      | All controls (sliders, buttons, inputs) must work with keyboard     |
| **Understandable** | Information and UI must be understandable                        | Clear labels, predictable behavior, helpful error/feedback messages |
| **Robust**         | Content must work with current and future assistive technologies | Proper semantic HTML and ARIA usage                                 |

### Practical Guidelines

#### 2.1 Semantic HTML in React

Use the correct HTML element for its purpose. React does not remove the need for semantics.

- Use `<button>` for all clickable actions (Generate, Download, Save Preset, etc.)
- Use `<label>` + `htmlFor` for every form control
- Use `<input type="range">`, `<input type="number">`, `<select>` etc. instead of custom divs when possible
- Use `<nav>`, `<main>`, `<header>`, `<footer>` for page structure

**Bad:**

```tsx
<div onClick={handleGenerate} className={styles.generateBtn}>
  Generate Spike
</div>
```

**Good:**

```tsx
<button
  onClick={handleGenerate}
  className={styles.generateBtn}
  disabled={isGenerating}
>
  {isGenerating ? "Generating..." : "Generate Spike"}
</button>
```

#### 2.2 Forms and Controls

- Every form control must have a visible label
- Use `aria-describedby` when you need to link helper text or error messages
- Show validation errors clearly and associate them with the field

Example:

```tsx
<label htmlFor="duration">Duration (ms)</label>
<input
  id="duration"
  type="number"
  value={duration}
  onChange={(e) => setDuration(Number(e.target.value))}
  aria-describedby="duration-help"
/>
<p id="duration-help">Recommended range: 50–5000 ms</p>
```

#### 2.3 Keyboard Navigation

Everything that can be clicked must also be reachable and operable via keyboard.

- Do **not** remove the default focus outline unless you replace it with a clearly visible alternative (`:focus-visible`)
- All interactive elements should be focusable in a logical order
- Support `Enter` and `Space` on buttons

#### 2.4 Dynamic Content & Live Regions

When content changes dynamically (loading states, generation progress, success messages), screen readers need to be notified.

Use `aria-live`:

```tsx
<div aria-live="polite" className={styles.status}>
  {statusMessage}
</div>
```

Good use cases in Pure Spike Studio:

- "Generating spike..."
- "Spike ready for download"
- Error messages when generation fails

#### 2.5 Color and Contrast

- Minimum contrast ratio of **4.5:1** for normal text (WCAG AA)
- Do not rely on color alone to convey information (use icons + text, or patterns)
- Test contrast early using tools like:
  - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - Chrome DevTools → Lighthouse

#### 2.6 Visual Elements (Waveform, Icons, Images)

- The waveform visualization should have an accessible name/description
- Decorative icons should have `aria-hidden="true"`
- Informative visuals should have proper `alt` text or `aria-label`

Example for a waveform container:

```tsx
<div role="img" aria-label="Waveform visualization of the generated spike">
  {/* canvas or SVG here */}
</div>
```

#### 2.7 Focus Management

- After important actions (e.g. after generating a spike), consider moving focus to the result area or a success message when it makes sense
- Avoid trapping focus unintentionally

### Accessibility Testing Checklist

Before considering a feature "done", do at least:

- [ ] Navigate the entire flow using only **Tab**, **Shift+Tab**, **Enter**, and **Space**
- [ ] Run **Lighthouse** accessibility audit (aim for 90+)
- [ ] Run **Axe** browser extension
- [ ] Verify that all form controls have visible labels
- [ ] Check that dynamic messages are announced by a screen reader (use VoiceOver or NVDA)

### Tools We Use

- Lighthouse (built into Chrome DevTools)
- Axe DevTools
- WAVE
- Keyboard-only testing (no mouse)
- Optional: NVDA (Windows) or VoiceOver (macOS)

---

## 3. User Experience Principles

We follow the most important principles from **Nielsen Norman Group’s 10 Usability Heuristics**, adapted to Pure Spike Studio.

### Key Principles We Prioritize

| Principle                                        | What it means                                    | How we apply it in Pure Spike Studio                                                   |
| ------------------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Visibility of system status**                  | Users should always know what is happening       | Clear loading states, progress feedback during generation, success/error messages      |
| **Match between system and real world**          | Use language and concepts familiar to the user   | Avoid technical jargon in UI text. Use words like “Generate”, “Download”, “Duration”   |
| **User control and freedom**                     | Users should be able to undo or cancel actions   | Allow changing parameters after generation, clear “Reset” options                      |
| **Consistency and standards**                    | Same things should look and behave the same      | All buttons, inputs and cards follow the same patterns                                 |
| **Error prevention**                             | Prevent mistakes before they happen              | Input validation, reasonable min/max values on sliders, clear limits                   |
| **Recognition rather than recall**               | Make options visible instead of requiring memory | Show current parameter values clearly, use good defaults                               |
| **Flexibility and efficiency**                   | Support both new and experienced users           | Good defaults + ability to fine-tune parameters                                        |
| **Aesthetic and minimalist design**              | Remove unnecessary information                   | Clean interface. Only show what is needed for spike generation                         |
| **Help users recognize and recover from errors** | Clear error messages                             | Helpful messages like “Duration must be between 10–10000 ms” instead of generic errors |
| **Help and documentation**                       | Provide help when needed                         | Tooltips, helper text, and clear labels on controls                                    |

### Practical Rules

- Every important action should give **immediate visual feedback** (button text change, loading indicator, success message).
- Use **consistent naming** across the UI (e.g. always call it “Generate Spike”, never mix with “Create” or “Build”).
- Show **current values** of all parameters at all times.
- When something takes time (generation), show clear progress/status.

**Example – Good feedback:**

```tsx
<button onClick={handleGenerate} disabled={isGenerating}>
  {isGenerating ? "Generating spike..." : "Generate Spike"}
</button>;

{
  status && (
    <div aria-live="polite" className={styles.status}>
      {status}
    </div>
  );
}
```

---

## 4. Security Best Practices (Frontend)

Security in the frontend is mostly about **reducing risk** and preparing for future backend integration.

### Core Rules

1. **Validate all input on the client**
   - Even though the backend will validate, we validate in the frontend for better UX and to catch obvious mistakes early.
   - Use proper `type`, `min`, `max`, and custom validation.

2. **Never trust data from the client**
   - Any logic related to permissions, payments, or sensitive operations must be validated on the server.
   - Frontend can hide/show features, but should never be the only security layer.

3. **Protect sensitive data**
   - Do **not** store passwords, tokens, or personal information in `localStorage` or `sessionStorage` unless absolutely necessary.
   - When we add authentication later, we will prefer `HttpOnly` cookies.

4. **Prevent XSS**
   - React already escapes content by default when using JSX.
   - Avoid using `dangerouslySetInnerHTML` unless absolutely necessary (and sanitize content if used).

5. **Be careful with third-party scripts**
   - Only add trusted scripts. Evaluate what they have access to.

### Current Scope (Pure Spike Studio v1)

For the initial version (client-side spike generation + optional download), the main risks are low.  
We will revisit and expand this section when we add user accounts and preset saving.

---

## 5. Performance Considerations

We care about both **actual performance** and **perceived performance**.

### Guidelines

- **Lazy load** non-critical resources when it makes sense (especially images and heavy components).
- Keep the initial JavaScript bundle as small as possible.
- Avoid unnecessary re-renders (use `React.memo`, `useMemo`, and `useCallback` wisely — see `coding-conventions.md`).
- For audio-related features (waveform rendering, generation), be mindful of heavy computations on the main thread.
- Use proper image optimization and responsive images (`srcset` + `sizes`) if we add any images later.
- Show loading states quickly so the interface feels responsive even if work is happening in the background.

### Perceived Performance

Users care more about how fast something _feels_ than actual load time.

- Give immediate feedback on button clicks.
- Show skeleton states or spinners for longer operations.
- Update the UI as soon as possible, even if background work continues.

---

## 6. Validation & Testing

We regularly check that we follow the guidelines in this document.

### Recommended Tools & Methods

| Tool / Method             | What we check                              | When to use                |
| ------------------------- | ------------------------------------------ | -------------------------- |
| **Lighthouse**            | Accessibility, Performance, Best Practices | After bigger features      |
| **Axe DevTools**          | Accessibility issues                       | During development         |
| **Keyboard-only testing** | Full keyboard navigation + focus           | Before finishing a feature |
| **Screen reader test**    | VoiceOver / NVDA                           | On important flows         |
| **Manual contrast check** | Color contrast                             | When adding new UI         |
| **User flow testing**     | Can a new user complete the main task?     | When adding new features   |

### Simple Checklist Before Merging

- [ ] All interactive elements are keyboard accessible
- [ ] All form controls have visible labels
- [ ] Dynamic content uses `aria-live` where relevant
- [ ] Lighthouse accessibility score ≥ 90
- [ ] No obvious contrast issues
- [ ] Clear feedback on important actions

---

## 7. Backend Quality & Security

### 7.1 Core Security Principles

- **Never trust the client**. All input must be validated and sanitized on the server, regardless of what the frontend does.
- Validate **early** in the request lifecycle (before business logic runs).
- Use a **defense-in-depth** approach: combine input validation, authentication, authorization, and proper error handling.
- Be explicit about what is allowed rather than trying to block what is not allowed.

### 7.2 Input Validation

- Use **Zod** as the primary validation library for all incoming data (`req.body`, `req.params`, `req.query`).
- Keep validation schemas close to the routes they validate (or in a dedicated `types/` folder).
- Always use `safeParse()` in controllers — never `parse()` (to avoid uncaught exceptions).
- Return clear, structured validation errors to the client (field + message).
- Strip unknown fields by default (Zod’s behavior) unless `.strict()` is explicitly needed.

### 7.3 Error Handling

- Implement a **centralized error handling middleware** as the last middleware in the chain.
- Never expose internal implementation details, stack traces, or database errors to clients in production.
- Use consistent error response format across the entire API.
- Log errors server-side with sufficient context for debugging, but never log sensitive data (passwords, tokens, personal information).
- Distinguish between **operational errors** (expected, e.g. validation, not found) and **programming errors** (bugs).

### 7.4 Authentication & Authorization

- Use **bcrypt** for password hashing (never store plain text passwords).
- Use **JWT** for stateless authentication.
- Protect sensitive routes with authentication middleware.
- Implement **role-based access control (RBAC)** when different user roles need different permissions.
- Validate JWT tokens on every protected request.
- Store JWT secrets and other sensitive configuration in environment variables — never in code or version control.

### 7.5 Data Protection & Privacy (GDPR-aware development)

- Apply **data minimization**: only collect and store data that is strictly necessary.
- Be transparent about what data is collected and why (especially if the project grows to handle personal data).
- Support the right to erasure ("right to be forgotten") — consider soft deletes or anonymization strategies.
- Log only what is necessary. Avoid logging personal data or sensitive information.
- When logging, prefer structured logging and exclude sensitive fields.

### 7.6 Secure Configuration & Environment

- Use `.env` files + `dotenv`, but **never commit** `.env` to Git.
- Validate that all required environment variables exist when the application starts.
- Use different configurations for development, testing, and production.
- Keep secrets (database URI, JWT secret, API keys) out of source code and logs.

### 7.7 API Security Best Practices

- Use HTTPS in production.
- Configure **CORS** properly — only allow trusted origins.
- Consider rate limiting on public or sensitive endpoints to protect against abuse.
- Return appropriate HTTP status codes (especially `401`, `403`, `404`, `422`).
- Version the API from the start (`/api/v1/...`).

### 7.8 Testing & Quality Assurance (Backend)

- Write automated tests for critical paths (especially authentication, authorization, and data validation).
- Test both **happy paths** and **error cases** (invalid input, unauthorized access, not found, etc.).
- Use tools like **Supertest** + **Jest** for integration testing of routes.
- Validate that error responses do not leak sensitive information.

### 7.9 Documentation & Maintainability

- Document the API using **Swagger/OpenAPI** (or similar) so it is self-documenting and testable.
- Keep documentation up to date as the API evolves.
- Write clear commit messages and maintain a clean Git history.
- Use meaningful variable, function, and file names that communicate intent.

## Final Notes

These guidelines are meant to help us build a high-quality product without slowing us down.
When in doubt, prioritize **clarity and usability** over perfection.

We will review and update this document together as the project grows.
