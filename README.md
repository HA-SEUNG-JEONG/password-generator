# 비밀번호 생성기

브라우저에서만 동작하는 비밀번호 / 패스프레이즈 생성기.
생성·검사 과정에서 비밀번호를 서버로 보내지 않습니다.

## 주요 기능

-   `crypto.getRandomValues` 기반 안전한 비밀번호 생성 (길이·문자 유형·제외 문자 선택)
-   EFF 단어 목록 기반 패스프레이즈 생성
-   Have I Been Pwned API로 유출 여부 확인 (k-anonymity)
-   zxcvbn 기반 안전도 검사
-   비밀번호 복사 / 새로고침 / 생성 이력
-   카카오톡 공유, 다크 모드, PWA 오프라인 지원

## 기술 스택

React 18 · TypeScript · Vite · Panda CSS

## 실행

```bash
npm install
npm run dev
```
