<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# contexts

## Purpose
React context providers.

## Key Files
| File | Description |
|------|-------------|
| `KakaoContext.tsx` | `KakaoProvider` — initializes Kakao JS SDK (`window.Kakao.init`) with `VITE_REST_API_KEY` on window load; exposes `{ isInitialized, isLoading, error }` via `useKakaoSDK()` hook (throws outside provider) |

## For AI Agents

### Working In This Directory
- SDK script is loaded in `index.html`; provider only initializes it. Handle both cases: `document.readyState === "complete"` and load-event listener.
- Missing API key or SDK sets `error` state (Korean message) — no throw during render.

## Dependencies

### Internal
- `window.Kakao` types from `../global.d.ts`

### External
- Kakao JS SDK (global), react-toastify
