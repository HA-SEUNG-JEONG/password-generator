<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# password-generator

## Purpose
Client-side secure password/passphrase generator (React 18 + TypeScript + Vite + Panda CSS). Generates passwords with `crypto.getRandomValues`, checks leaks against the Have I Been Pwned API (k-anonymity), scores strength with zxcvbn, and supports KakaoTalk sharing. Korean-language UI. Deployed on Vercel.

## Key Files
| File | Description |
|------|-------------|
| `package.json` | Scripts: `dev`, `build` (both run `panda codegen` first), `serve` |
| `panda.config.ts` | Panda CSS config — design tokens, light/dark theme via `data-theme` |
| `vite.config.ts` | Vite + React plugin config |
| `tsconfig.json` | TS config (`@/` path alias to `src/`) |
| `index.html` | Entry HTML; loads Kakao JS SDK |
| `vercel.json` | Vercel deploy config |
| `.env` | `VITE_REST_API_KEY` (Kakao) — never commit |
| `IMPROVEMENTS.md` | Backlog of planned improvements |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `src/` | Application source (see `src/AGENTS.md`) |
| `styled-system/`, `s/` | **Generated** Panda CSS output — never edit by hand; regenerate with `npx panda codegen` |
| `public/` | Static assets (favicon, PWA manifest, robots.txt) |
| `assets/`, `src/assets/` | SVG icons (eye, moon, sun) |
| `.omc/`, `.claude/`, `.cursor/` | Tooling state/config — not application code |

## For AI Agents

### Working In This Directory
- Verify with `npm run build`: runs `panda codegen`, `tsc`, then `vite build`.
- Styling uses Panda CSS `css()` from `styled-system/css` — no Tailwind; only global CSS is `src/index.css`.
- Never edit `styled-system/` or `s/` (codegen output).
- UI text is Korean; keep new user-facing strings in Korean and centralize them in `src/constants/messages.ts`.

### Testing Requirements
No test suite currently. Verify with `npm run build` (type check) and `npm run dev` (manual check).

## Dependencies

### External
- React 18, TypeScript, Vite 6 — app framework/build
- @pandacss/dev — styling codegen
- zxcvbn — password strength scoring
- react-toastify — toast notifications
- Kakao JS SDK (loaded in `index.html`) — share feature
- Have I Been Pwned range API — leak check (network)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->

## Generate Commit Message

- Use {{ KOREAN }}
