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

_(To be populated from backend study materials)_

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

Example: Storage adapter

```ts
// shared/adapters/storage/storage.web.ts
// shared/adapters/storage/storage.native.ts
// shared/adapters/storage/index.ts → exports correct one automatically
```

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

_(Placeholder – will be expanded with backend material)_

## 6. Do's and Don'ts

**Do:**

- Model state explicitly with discriminated unions
- Stabilize Context values with `useMemo`
- Separate Core logic from platform-specific code
- Use `StyleSheet.create` in React Native
- Write tests that describe user behavior

**Don't:**

- Put text directly inside `View` in React Native
- Create new object references in Context Provider on every render
- Forget cleanup in data-fetching effects
- Nest `FlatList` inside `ScrollView` without a good reason
- Test internal implementation details
