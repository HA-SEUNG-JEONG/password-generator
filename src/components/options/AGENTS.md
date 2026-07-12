<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# options

## Purpose
Password/passphrase mode toggle and generation option inputs.

## Key Files
| File | Description |
|------|-------------|
| `PasswordOption.tsx` | Exports `PasswordOptions` — password/passphrase mode toggle; passphrase mode: word-count slider, separator input, capitalize/number checkboxes; password mode: length control + character options |
| `PasswordCharacterOptions.tsx` | Checkbox group for lowercase/uppercase/numbers/special/excludeAmbiguous (memoized, data-driven `OPTIONS` array) |
| `CheckboxOption.tsx` | Reusable labeled checkbox with description (memoized) |

## For AI Agents

### Working In This Directory
- All inputs are controlled; changes bubble up via `onChange(Partial<PasswordOptionsType>)` — never mutate options locally.
- Passphrase option updates must spread existing `passphraseOptions` (partial nested object).
- Add new character options to the `OPTIONS` array in `PasswordCharacterOptions.tsx`, not as new JSX.

## Dependencies

### Internal
- `../controls/PasswordControls`, `../../types/password`, `../../constants/passwordConfig`
