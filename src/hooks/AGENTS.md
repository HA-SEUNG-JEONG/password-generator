<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# hooks

## Purpose
Custom React hooks.

## Key Files
| File | Description |
|------|-------------|
| `usePwnedCheck.ts` | Wraps `checkPwnedPassword` — returns `{ isPwned, isChecking, error, checkPassword, reset }`; request-ID ref guards against race conditions (only latest request updates state) |

## For AI Agents

### Working In This Directory
- Keep the request-ID pattern when modifying async logic — rapid regeneration fires overlapping HIBP requests.
- Empty password short-circuits to reset state, no network call.
- Note: `useDebounce` lives in `../utils/debounce.ts`, not here.

## Dependencies

### Internal
- `../utils/passwordGenerator` (`checkPwnedPassword`), `../constants/messages`
