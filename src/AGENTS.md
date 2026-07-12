<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# src

## Purpose
Application source. Entry point mounts `App`, which provides theme toggle (light/dark via `data-theme` + localStorage) and the Kakao SDK provider around the single feature: `PasswordGenerator`.

## Key Files
| File | Description |
|------|-------------|
| `main.tsx` | ReactDOM entry; mounts `App` + global `ToastContainer` |
| `App.tsx` | Root component — theme state/toggle, `KakaoProvider`, card layout |
| `index.css` | Minimal global CSS (rest is Panda CSS) |
| `global.d.ts` | Global types — `window.Kakao`, `KakaoShareOptions` |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `components/` | UI components (see `components/AGENTS.md`) |
| `constants/` | App-wide constants (see `constants/AGENTS.md`) |
| `contexts/` | React contexts (see `contexts/AGENTS.md`) |
| `hooks/` | Custom hooks (see `hooks/AGENTS.md`) |
| `types/` | Shared TS types (see `types/AGENTS.md`) |
| `utils/` | Pure logic — generation, strength, debounce (see `utils/AGENTS.md`) |
| `assets/` | SVG icons (eye/eye-off, moon, sun) — no AGENTS.md needed |

## For AI Agents

### Working In This Directory
- Import styles via `css()` from `../styled-system/css` (relative depth varies) or `@/` alias.
- Theme is `data-theme` attribute on `<html>`; semantic tokens (`bg: "card"`, `color: "text"`) come from `panda.config.ts`.
- Data flow: `App` → `PasswordGenerator` (state owner) → display/options components via props. No global state library.

### Common Patterns
- Function components with default export, one component per file.
- Korean UI strings, ARIA attributes on interactive elements.

## Dependencies

### Internal
- `../styled-system/css` — generated Panda CSS runtime

### External
- react, react-dom, react-toastify
