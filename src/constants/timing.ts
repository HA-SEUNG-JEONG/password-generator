/**
 * 애플리케이션 전반에 사용되는 타이밍 상수
 */

/**
 * Debounce 지연 시간 (밀리초)
 * 사용자 입력 후 대기하는 시간
 */
export const DEBOUNCE_DELAY = {
  /**
   * 비밀번호 생성 옵션 변경 시 debounce 시간
   * 사용자가 슬라이더를 조작하거나 체크박스를 빠르게 클릭할 때 적용
   */
  PASSWORD_GENERATION: 300,

  /**
   * 비밀번호 강도 검사 debounce 시간
   * zxcvbn 라이브러리 호출 최적화
   */
  STRENGTH_CHECK: 200,
} as const;

/**
 * 애니메이션 지속 시간 (밀리초)
 */
export const ANIMATION_DURATION = {
  /**
   * 기본 전환 애니메이션
   */
  DEFAULT: 200,

  /**
   * 테마 전환 애니메이션
   */
  THEME_TRANSITION: 200,
} as const;

