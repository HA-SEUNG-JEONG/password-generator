# 개선사항 일괄 작업 — 7개 PR (버그 3 + UX 4 + 기능 4)

**날짜**: 2026-07-12
**유형**: fix + feat (7개 PR 분리)
**베이스**: main (PR #6 `fix/paraphrase` 머지 후)

## 배경

코드베이스 점검에서 버그 3건(다크 모드 깨짐, 길이 입력 타이핑 막힘, passphrase 모드 zxcvbn 오표시), UX 개선 4건, 기능 추가 4건 발견. 기능별 워크트리(`../pw-wt/<branch>`)로 분리해 개별 PR 생성.

## PR 목록

| PR | 브랜치 | 내용 |
|----|--------|------|
| #9 | `fix/dark-mode-tokens` | 옵션 패널 하드코딩 회색/파랑을 semantic token(`border`/`muted`/`muted-foreground`/`text`/`primary`)으로 교체. 다크 모드에서 길이 입력·라벨·체크박스가 안 보이던 문제 해결 |
| #7 | `fix/length-input-ux` | 키 입력마다 MIN 강제 리셋 제거 — "24" 타이핑 불가 버그. 검증은 blur 시점으로 이동, range 슬라이더 병행, 잘못된 ARIA 제거 |
| #10 | `fix/passphrase-strength-ui` | passphrase 모드에서 zxcvbn 대신 엔트로피 기반 강도 바 표시 (zxcvbn은 passphrase 미보정). `getStrengthLabel` 공용 유틸로 추출, 구분자 프리셋 버튼 그룹 추가 |
| #13 | `fix/ui-polish` | 복사 성공 시 1.5초 "복사됨 ✓" 피드백, refresh 아이콘 1회전 애니메이션, 마지막 문자 옵션 해제 방지(빈 풀 예방) |
| #8 | `feat/password-history` | 세션 내 최근 10개 히스토리 (in-memory only, 보안상 localStorage 미저장). native `<details>` 접기 |
| #12 | `feat/custom-exclude` | `customExclude` 옵션 — 지정 문자를 풀에서 제외. **수정 커밋 포함**: 카테고리별 필수 문자 주입이 미필터 문자셋에서 뽑아 제외 문자가 누출되던 버그 (9adb112) |
| #11 | `feat/pwa` | `vite-plugin-pwa` (autoUpdate), manifest 정비, CRA 잔재 제거(`lang="ko"`, description). Kakao SDK는 외부 스크립트라 오프라인 캐시 제외 |

## 검증

- 7개 워크트리 전부 vitest 통과 (custom-exclude는 수정 후 17/17 × 3회 연속)
- PWA 빌드 산출물 확인: `sw.js`, `workbox-*.js`, `manifest.webmanifest` 생성
- 다크 모드 육안 확인 (dev 서버 + `data-theme="dark"`): 비밀번호 패널·passphrase 패널 모두 정상. 주의 — 포트 5173에 구버전 dev 서버가 떠 있어 처음엔 깨진 화면으로 오인, 실제 검증은 5174

## 머지 순서

PR #9가 #7·#10·#13과 같은 파일을 건드림 — **#9 먼저 머지**, 이후 PR은 머지 시점 rebase. #8/#11/#12는 독립적.

## 관련 커밋 (각 브랜치)

- c8712e4 fix: 옵션 패널 다크 모드 시맨틱 토큰 적용
- e0c96bb fix: 길이 입력 UX 개선
- 9f5acb8 fix: passphrase 모드 엔트로피 강도 표시 및 구분자 UI 개선
- 5af5f64 fix: UI 폴리시 3건 (복사 피드백, 새로고침 애니메이션, 문자 옵션 보호)
- 415d264 feat: 비밀번호 생성 이력 기능 추가
- de360c1 feat: 커스텀 제외 문자 기능 추가 / 9adb112 fix: 커스텀 제외 문자 필터링 누수 해결
- ea48251 feat: PWA 오프라인 지원 추가
