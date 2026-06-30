# Coding Conventions – Pure Spike Studio

This document defines the coding standards and patterns for the Pure Spike Studio project.

## 1. General Principles

- Clarity, readability and maintainability first.
- Prefer explicit modeling of state (especially discriminated unions).
- Separate concerns clearly: Core logic, Adapters, UI.
- Write code that is easy to test, refactor and reason about.

## 2. Project Structure & Naming

- Components: PascalCase (`SpikeGenerator.tsx`, `PresetCard.tsx`)
- Custom hooks: `use` + camelCase (`useSpikeSettings.ts`, `usePresets.ts`)
- API layer: `src/api/`
- Types: `src/types/` or co-located
- Layouts: `src/layouts/`
- Pages/Screens: `src/pages/`

## 3. Frontend Conventions

### 3.1 React Components (Web & React Native)

> **Note:** React Native conventions are included for potential future expansion or code sharing. For the current web-focused version of Pure Spike Studio, these can be ignored.

- Always use functional components + hooks.
- Keep components focused.
- In React Native: Use `View` + `Text` hierarchy. Never put text directly in `View`.

#### Core Components (React Native)

- Container: `View`, `SafeAreaView`
- Text: `Text`
- Touch: `Pressable` (preferred over `Touchable*`)
- Input: `TextInput` (controlled with `onChangeText`)
- Lists: `FlatList` (preferred for long lists), `ScrollView` (for small content)
- Use `ListHeaderComponent` instead of wrapping `FlatList` in `ScrollView`

### 3.2 Styling

**Web**

- Primary approach: **CSS Modules** (`.module.css`)
- Use design tokens (CSS variables or TypeScript objects) for spacing, colors, radius, etc.
- Keep styles co-located with the component

**React Native**

> _(React Native styling guidance is retained for future use. Current development focuses on web with CSS Modules.)_

- Use `StyleSheet.create` as the standard
- Use design tokens

**Design tokens example (TypeScript)**

```ts
export const tokens = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 10, lg: 16 },
  fontSize: { sm: 14, md: 16, lg: 20, xl: 24 },
} as const;
```

### 3.3 State Management

- Simple local state → `useState`
- Complex / interrelated state → `useReducer` + discriminated unions
- Shared/global state → Context + custom hooks (`useTheme()`, `usePresets()` etc.)

**Strongly recommended pattern for async data:**

```ts
export type LoadState<T> =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };
```

### 3.4 Routing & Navigation

> **Note:** React Navigation guidance applies only if React Native support is added later.

- **Web**: React Router (`BrowserRouter`, nested routes, `<Outlet />`, `useParams`, `generatePath`, `NavLink`)
- **React Native**: React Navigation (stack navigation as base)
- Always handle missing route params safely in TypeScript.

### 3.5 Data Fetching & API Layer (Frontend)

Create a robust, typed API layer.

**Recommended pattern:**

- `fetchJson<T>` wrapper with proper `HttpError` handling
- Or a configured Axios instance with interceptors
- Always have a `getErrorMessage(err: unknown)` helper
- Use `cancelled` flag or `AbortController` in `useEffect`
- For more complex applications involving caching, background refetching or optimistic updates, consider TanStack Query as a future enhancement. For Pure Spike Studio v1 the patterns above are sufficient.

### 3.6 Forms

- Controlled components
- Complex forms → `useReducer` + TypeScript
- Show validation errors clearly

### 3.7 Testing (Jest + React Testing Library)

- Test **behavior**, not implementation
- Use `userEvent` + `getByRole` with accessible names
- Use `findBy...` / `waitFor` for async UI
- Structure tests as Arrange → Act → Assert
- Prioritize critical user flows

## 4. Backend Conventions

### 4.1 Project Structure

```ts
src/
├── routes/           # Route definitions only
├── controllers/      # Thin controllers (call services + return responses)
├── services/         # Business logic (recommended)
├── models/           # Mongoose models + schemas
├── middleware/       # validation, auth, errorHandler, logger
├── types/            # Zod schemas, DTOs, interfaces
├── utils/            # Helpers (e.g. getErrorMessage, asyncHandler)
├── config/           # Environment validation
├── app.ts
└── server.ts
```

### 4.2 REST API Design

- Use **plural nouns** for resources: `/spikes`, `/presets`, `/users`
- Use **kebab-case** for multi-word paths
- Version the API: `/api/v1/...`
- Use query parameters for filtering, sorting and pagination
- Return consistent response shapes

**Recommended response format (success):**

```ts
{
  data: T | T[],
  meta?: { total?: number, page?: number, limit?: number }
}
```

**Recommended error format:**

```ts
{
  error: {
    code: string,      // e.g. "PRESET_NOT_FOUND"
    message: string,
    details?: unknown
  }
}
```

### 4.3 TypeScript in Backend

- Type `Request` and `Response` properly using generics.
- Separate **Mongoose models** from **API DTOs**.
- Use Zod schemas as the single source of truth for input validation (and infer types from them when possible).
- Prefer `interface` for models/DTOs and `type` for unions/discriminated types.

### 4.4 Database & Mongoose

- Use **MongoDB** with **Mongoose**.
- Define schemas and models in `src/models/`.
- Use timestamps (`createdAt`, `updatedAt`).
- Prefer **referencing** over embedding for most relations (especially users ↔ presets).
- Use `ObjectId` references with proper population when needed.

### 4.5 CRUD Patterns

Use these Mongoose patterns consistently:

| Operation | Recommended Method                                                  | Notes                    |
| --------- | ------------------------------------------------------------------- | ------------------------ |
| Create    | `Model.create()`                                                    | Clean and concise        |
| Read      | `Model.find()`, `Model.findById()`, `Model.findOne()`               | Handle `null` → 404      |
| Update    | `findByIdAndUpdate(id, update, { new: true, runValidators: true })` | Always use `new: true`   |
| Delete    | `findByIdAndDelete(id)`                                             | Returns deleted document |

**Pagination + filtering + sorting** should be supported on list endpoints.

### 4.6 Input Validation with Zod

- **Always** validate `req.body`, `req.params` and `req.query` with Zod.
- Use `safeParse()` in controllers.
- Use the validated `result.data`, not the raw request object.
- Keep Zod schemas in `src/types/` or co-located with the route.

### 4.7 Error Handling

- Use a **centralized error handling middleware** (last in the chain).
- Never leak internal details (stack traces, database errors) to clients.
- Wrap async route handlers to avoid unhandled promise rejections.
- Log errors server-side with enough context.

### 4.8 Authentication & Authorization

- Use **JWT** + **bcrypt** for authentication.
- Store JWT secret and other secrets in environment variables (never in code).
- Use **role-based access control (RBAC)** for authorization when needed.
- Protect routes with authentication middleware.
- Validate tokens on protected endpoints.

### 4.9 Security & Data Protection

- **Never trust the client** — validate everything on the server.
- Be mindful of NoSQL injection when building dynamic queries.
- Follow basic OWASP principles (especially input validation and proper error handling).
- Consider data minimization and secure logging (especially if handling personal data).

### 4.10 Environment & Configuration

- Use `dotenv` + a validated config module.
- Never commit `.env` files.
- Validate that all required environment variables exist at startup.
- Separate configuration clearly between development, test and production.

## 5. Shared Conventions

### 5.1 TypeScript Patterns

- Use discriminated unions for state machines
- Type events properly (`React.ChangeEvent<HTMLInputElement>`, etc.)
- Prefer clear prop types over `React.FC`
- Use generics for reusable utilities
- Narrow route params early

### 5.2 Architecture: Core / Adapter / UI

This is the most important long-term pattern.

- **Core**: Platform-agnostic logic (types, validation, pure functions, reducers, API contracts)
- **Adapter**: Platform-specific bridges (storage, config, navigation helpers)
- **UI**: Platform-specific components and screens

**Goal**: Maximize code sharing between web and mobile without forcing unnatural abstractions.

**File-based platform splitting (recommended)**

- Use `.web.ts` / `.native.ts` suffixes for larger differences
- Use `Platform.select` or `Platform.OS` for small styling/logic differences

### 5.3 Naming Conventions

| Type                 | Convention        | Example                       |
| -------------------- | ----------------- | ----------------------------- |
| Component            | PascalCase        | `PresetCard`                  |
| Custom Hook          | `use` + camelCase | `usePresets`                  |
| API functions        | camelCase         | `getPresets`, `generateSpike` |
| Types                | PascalCase        | `Spike`, `Preset`             |
| State variables      | camelCase         | `spikeDuration`               |
| Constants            | UPPER_SNAKE_CASE  | `MAX_DURATION_MS`             |
| Reducer action types | "domain/action"   | `"tasks/loaded"`              |

### 5.4 Error Handling & Validation

See `coding-conventions.md` sections 4.6–4.7 and `quality-guidelines.md` section 7 for backend patterns. Frontend should also handle errors gracefully and show user-friendly messages.

## 6. Do's and Don'ts

**Do:**

- Model state explicitly with discriminated unions
- Stabilize Context values with `useMemo`
- Separate Core logic from platform-specific code
- Use `StyleSheet.create` in React Native
- Write tests that describe user behavior
- Validate all input on the backend with Zod
- Use consistent response and error formats

**Don't:**

- Put text directly inside `View` in React Native
- Create new object references in Context Provider on every render
- Forget cleanup in data-fetching effects
- Nest `FlatList` inside `ScrollView` without a good reason
- Test internal implementation details
- Trust client input without server-side validation
- Expose internal error details to clients
