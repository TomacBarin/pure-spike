# Coding Conventions – Pure Spike Studio

This document defines the coding standards and patterns we follow in the Pure Spike Studio project. The goal is to keep the codebase consistent, readable, and maintainable.

These conventions are based on the React + TypeScript course material and adapted to this project.

## 1. General Principles

- Prefer **clarity and readability** over clever or overly compact code.
- Write code that is easy to understand for future you (and for AI assistants).
- Keep components focused and small.
- Minimize state when possible. Only put data in state if it changes over time **and** affects what is rendered.
- Follow the patterns taught in the course (especially regarding state, hooks, and component structure).

## 2. Project Structure & File Naming

- Use **PascalCase** for component files and folders (e.g. `SpikeGenerator.tsx`, `PresetCard.tsx`).
- Use **camelCase** for utility files and hooks (e.g. `useSpikeGenerator.ts`, `formatImpulse.ts`).
- Keep related files close together (e.g. a component + its custom hook in the same folder when it makes sense).
- Use descriptive folder names: `components/`, `hooks/`, `utils/`, `types/`, `pages/`, etc.

## 3. React Components

- Always use **functional components** with hooks.
- Component names must start with a capital letter.
- Keep components focused on **one responsibility**.
- Prefer composition over deep prop drilling.
- Use **lifting state up** when multiple components need to share the same data.

### Example of a clean component

```tsx
// Good
function SpikeControls() {
  const [duration, setDuration] = useState(1000);

  return (
    <div>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
    </div>
  );
}
```

## 4. State Management

### useState

- Use `useState` for **simple, independent** pieces of state.
- Follow the naming convention: `value` + `setValue`.

```tsx
const [isPlaying, setIsPlaying] = useState(false);
const [spikeName, setSpikeName] = useState("");
```

- Prefer multiple small `useState` calls over one large object **unless** the values are frequently updated together.

### useReducer (when state gets complex)

Use `useReducer` when:

- State has multiple related fields (e.g. form with values, errors, touched, status).
- There are many different ways the state can change.
- The update logic is complex or has many edge cases.

Example pattern from the course (form with validation):

```tsx
const [state, dispatch] = useReducer(formReducer, initialState);

// Actions like:
dispatch({ type: "change_field", payload: { name, value } });
dispatch({ type: "blur_field", payload: fieldName });
```

## 5. Hooks

### Rules of Hooks

- Only call hooks at the **top level** of your component (never inside loops, conditions, or nested functions).

### useEffect

- Use `useEffect` for side effects (data fetching, subscriptions, timers, syncing with localStorage, etc.).
- Always include the correct dependency array.
- Prefer multiple focused `useEffect` hooks over one big one.

### useRef

- Use `useRef` for:
  - Accessing DOM elements (focus, measurements, etc.)
  - Storing mutable values that should **not** trigger re-renders

### useMemo & useCallback

- Use `useMemo` and `useCallback` **only when needed** for performance (expensive calculations or when passing callbacks to optimized child components).
- Do not overuse them — they add complexity.

## 6. Forms & Controlled Components

- Prefer **controlled components** (state drives the input value).
- When building forms with validation, loading states, and touched fields → strongly consider `useReducer`.

## 7. Naming Conventions

| Type                 | Convention              | Example                         |
| -------------------- | ----------------------- | ------------------------------- |
| Component            | PascalCase              | `SpikeGenerator`                |
| Hook                 | camelCase + use prefix  | `useSpikeSettings`              |
| State variable       | camelCase               | `spikeDuration`                 |
| State setter         | `set` + camelCase       | `setSpikeDuration`              |
| Reducer action types | snake_case or camelCase | `"change_field"`, `submitStart` |
| Utility functions    | camelCase               | `generateImpulse()`             |
| Constants            | UPPER_SNAKE_CASE        | `MAX_DURATION`                  |

---
