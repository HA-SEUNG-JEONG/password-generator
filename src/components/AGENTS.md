<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# components

## Purpose
All UI components. `PasswordGenerator` owns state (options, generated password, pwned-check status) and composes the display and options subtrees.

## Key Files
| File | Description |
|------|-------------|
| `PasswordGenerator.tsx` | State owner — generates password (debounced on option change), triggers HIBP check, renders warnings/loading |
| `PasswordDisplay.tsx` | Shows password with visibility toggle, copy-to-clipboard, refresh button, Kakao share; lazy-loads strength indicator |
| `PasswordStrengthIndicator.tsx` | zxcvbn-based strength bar (debounced), maps score → `strengthLevels`; lazy-loaded |
| `PasswordLength.tsx` | Read-only length feedback vs MIN/RECOMMEND/MAX |
| `KakaoButton.tsx` | KakaoTalk share button using `useKakaoSDK` |
| `CopyIcon.tsx`, `RefreshIcon.tsx` | Inline SVG icon components |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `controls/` | Length input control (see `controls/AGENTS.md`) |
| `options/` | Mode toggle + option checkboxes (see `options/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `PasswordGenerator` is the only stateful orchestrator; child components stay controlled (props + callbacks).
- Option changes flow through `onChangeOptions` → debounced regeneration (`DEBOUNCE_DELAY.PASSWORD_GENERATION`).
- `PasswordStrengthIndicator` must stay `lazy()`-loaded — zxcvbn is a large bundle.
- Preserve ARIA (`role="alert"`, `aria-live`, `aria-pressed`) when editing.

### Common Patterns
- `memo()` on leaf components receiving stable props (`PasswordDisplay`, `CheckboxOption`).
- Panda `css()` style objects defined at module top or inline.

## Dependencies

### Internal
- `../utils/passwordGenerator`, `../utils/debounce`, `../utils/strengthLevel`
- `../hooks/usePwnedCheck`, `../contexts/KakaoContext`
- `../constants/` (messages, timing, passwordConfig)

### External
- zxcvbn (strength), react-toastify (toasts)
