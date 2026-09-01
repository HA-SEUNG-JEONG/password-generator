import { Messages } from "./types";

const messages: Messages = {
  app: {
    darkModeLabel: "다크 모드로 전환",
    lightModeLabel: "라이트 모드로 전환",
  },
  passwordDisplay: {
    clipboardUnavailable: "클립보드 기능을 사용할 수 없습니다.",
    copySuccess: "복사됨 ✓",
    copyFailed: "비밀번호 복사에 실패했습니다.",
    generatePassword: "비밀번호를 생성해주세요",
    showPassword: "비밀번호 보기",
    hidePassword: "비밀번호 숨기기",
    copyButton: "복사하기",
    copiedButton: "복사됨 ✓",
    refreshButton: "새로 생성",
    passphraseStrengthLabel: (strength: string) =>
      `Passphrase 강도: ${strength}`,
    entropyLevelAriaLabel: "Passphrase 엔트로피 수준",
    strengthLevelAriaLabel: "비밀번호 강도 수준",
  },
  passwordGenerator: {
    securityCheckInProgress: "비밀번호 보안 검사 중...",
  },
  passwordHistory: {
    title: "생성 기록",
    noHistory: "기록이 없습니다",
  },
  passwordOptions: {
    mode: "모드",
    passwordMode: "비밀번호",
    passphraseMode: "패스프레이즈",
    length: "길이",
    words: "단어 수",
    separator: "구분자",
    lowercase: "소문자",
    uppercase: "대문자",
    numbers: "숫자",
    special: "특수문자",
    excludeAmbiguous: "모호한 문자 제외",
    customExclude: "제외할 문자",
    capitalize: "첫 글자 대문자",
    includeNumber: "숫자 포함",
    optionsLabel: "비밀번호 생성 옵션",
    wordsLabel: (count: number) => `단어 개수: ${count}`,
    securityLevel: (level: string, entropy: number, isWeak: boolean) =>
      `보안 수준: ${level} (${entropy.toFixed(1)} bits)${isWeak ? " ⚠ 4단어 이상 권장" : ""}`,
    separatorLabel: "구분자",
    space: "공백",
    custom: "커스텀",
    customSeparatorLabel: "커스텀 구분자",
    capitalizeLabel: "단어 첫 글자 대문자화",
    capitalizeDesc: "각 단어의 첫 글자를 대문자로 변환",
    includeNumberLabel: "숫자 포함",
    includeNumberDesc: "랜덤 숫자를 passphrase에 추가",
    minLength: (min: number) => `최소 ${min}자`,
    maxLength: (max: number) => `최대 ${max}자`,
    lengthDisplay: (length: number, recommend: number) =>
      `비밀번호 길이: ${length}자 (권장: ${recommend}자 이상)`,
    lengthDisplaySimple: (length: number) => `비밀번호 길이: ${length}자`,
    requireAtLeastOne: "최소 1개 옵션 필수",
    customExcludeLabel: "제외할 문자",
    customExcludePlaceholder: "제외할 문자를 입력하세요 (예: !@#)",
    lengthControlLabel: "비밀번호 길이 조절",
    lengthControlDescription: (min: number, max: number) =>
      `비밀번호 길이를 ${min}자에서 ${max}자 사이로 조절할 수 있습니다.`,
    lengthInputLabel: "비밀번호 길이",
    lengthSliderLabel: "비밀번호 길이 슬라이더",
  },
  kakao: {
    apiKeyNotSet: "카카오 API 키가 설정되지 않았습니다.",
    sdkLoadFailed: "카카오 SDK를 불러오지 못했습니다.",
    initializationFailed: "카카오 SDK 초기화 실패",
    shareText: "비밀번호 생성기를 사용해보세요!",
    shareButtonLabel: "카카오톡 공유",
    missingShareText: "공유할 내용이 없습니다.",
  },
  errors: {
    tooManyRequests: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
    networkError: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
    pwnedCheckGeneric: "비밀번호 보안 검사 중 오류가 발생했습니다.",
    emptyPasswordWarning: "최소 하나 이상의 문자 유형을 선택해야 합니다.",
    passwordPwnedWarning:
      "이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다. 다른 비밀번호를 사용하거나, 이 비밀번호를 사용하는 다른 서비스의 비밀번호를 변경하세요.",
    passphraseWordsRange: (min: number, max: number) =>
      `단어는 ${min}개 이상 ${max}개 이하로 설정해주세요.`,
    passwordLengthMax: (max: number) => `비밀번호는 최대 ${max}자 이하여야 합니다.`,
  },
  locale: {
    ariaLabel: "언어 전환",
  },
  strengthLevels: {
    veryWeak: {
      level: "매우 취약",
      message: "매우 취약한 비밀번호입니다",
    },
    weak: {
      level: "약함",
      message: "취약한 비밀번호입니다",
    },
    fair: {
      level: "보통",
      message: "적정 수준의 비밀번호입니다",
    },
    strong: {
      level: "강함",
      message: "안전한 비밀번호입니다",
    },
    veryStrong: {
      level: "매우 강함",
      message: "매우 안전한 비밀번호입니다",
    },
  },
  criteria: {
    minLength: "8자 이상",
    recommendedLength: "12자 이상 권장",
    uppercase: "대문자",
    lowercase: "소문자",
    numbers: "숫자",
    specialChars: "특수문자",
    sequential: "연속된 숫자 제거",
    repeated: "반복된 문자 제거",
    commonWords: "일반적인 패턴 제거",
    mixedChars: "문자 조합 다양화",
  },
};

export default messages;
export type { Messages };
