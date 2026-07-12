<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# utils

## Purpose
Core logic: secure password/passphrase generation, HIBP leak check, strength criteria, debounce.

## Key Files
| File | Description |
|------|-------------|
| `passwordGenerator.ts` | `generateSecurePassword` (guarantees ≥1 char per selected type when length allows, Fisher-Yates shuffle), `generateSecurePassphrase` (word list + optional capitalize/number), `checkPwnedPassword` (SHA-1 k-anonymity range query to api.pwnedpasswords.com, exponential-backoff retry ×3), all randomness via `crypto.getRandomValues` |
| `criteria.ts` | `criteriaMap` — per-criterion `test`/`message` pairs (length, char classes, sequential/repeated/common patterns) |
| `strengthLevel.ts` | `strengthLevels` — zxcvbn score (0–4) → Korean label/message/color |
| `debounce.ts` | `useDebounce` hook — stable debounced callback via refs (actually a hook despite living in utils) |

## For AI Agents

### Working In This Directory
- **Security-critical**: randomness must stay `crypto.getRandomValues` — never `Math.random`. HIBP check must send only the 5-char SHA-1 prefix, never the full hash/password.
- Empty character pool returns `""` (caller shows warning) — don't turn that into a throw.
- Passphrase word count clamps to `PASSPHRASE_CONFIG` range with a toast, doesn't throw; unsupported language throws.

### Testing Requirements
No test suite. If touching generation logic, at minimum verify manually: all option combos produce expected charset membership, and length < selected-types edge case.

## Dependencies

### Internal
- `../constants/` (characterSets, wordLists, passwordConfig, messages), `../types/`

### External
- react-toastify (range-clamp warning), Web Crypto API, fetch (HIBP)
