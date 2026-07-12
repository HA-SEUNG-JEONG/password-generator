<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# controls

## Purpose
Password length input control.

## Key Files
| File | Description |
|------|-------------|
| `PasswordControls.tsx` | Exports `PasswordLengthControl` — number input clamped to `PASSWORD_LENGTH.MIN/MAX`, debounced `onLengthChange` (300ms), toast on over-max, renders `PasswordLength` feedback |

## For AI Agents

### Working In This Directory
- File name (`PasswordControls`) and component name (`PasswordLengthControl`) differ — keep imports consistent.
- Local state (`localLength`) gives instant input feedback; parent state updates are debounced.

## Dependencies

### Internal
- `../PasswordLength`, `../../constants/passwordConfig`, `../../constants/messages`, `../../utils/debounce`

### External
- react-toastify
