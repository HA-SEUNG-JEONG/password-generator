<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# constants

## Purpose
Single source of truth for configuration values, user-facing strings, and character/word data.

## Key Files
| File | Description |
|------|-------------|
| `passwordConfig.ts` | `PASSWORD_LENGTH` (8/12/30), `PASSPHRASE_CONFIG` (3–10 words), `DEFAULT_PASSPHRASE_OPTIONS` |
| `characterSets.ts` | `CHARACTER_SETS` (lowercase/uppercase/numbers/special), `removeAmbiguousChars()` |
| `messages.ts` | `ERROR_MESSAGES` — all Korean user-facing error/warning strings (some as functions taking params) |
| `timing.ts` | `DEBOUNCE_DELAY` (generation 300ms, strength 200ms), `ANIMATION_DURATION` |
| `wordLists.ts` | Passphrase word lists keyed by language (`en`) |

## For AI Agents

### Working In This Directory
- New user-facing strings go in `messages.ts` (Korean), not inline in components.
- All exports use `as const` — keep it for literal types.
- Adding a passphrase language = new key in `wordLists.ts`; generator validates `wordLists[language]` exists.

## Dependencies

### Internal
- `../types/password` (`PassphraseOptions`)
