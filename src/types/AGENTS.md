<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# types

## Purpose
Shared TypeScript types and error classification helpers.

## Key Files
| File | Description |
|------|-------------|
| `password.ts` | `CharacterOptions`, `PassphraseOptions`, `PasswordOptions` (extends CharacterOptions; `mode: "password" \| "passphrase"`) |
| `errors.ts` | `isNetworkError()` / `isRateLimitError()` — heuristic checks on error message content |

## For AI Agents

### Working In This Directory
- `PasswordOptions.passphraseOptions` is `Partial<PassphraseOptions>` — consumers merge with `DEFAULT_PASSPHRASE_OPTIONS`.
- Error checks are string-matching heuristics, not error subclasses — keep call sites tolerant of `unknown`.
