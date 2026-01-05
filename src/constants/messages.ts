export const ERROR_MESSAGES = {
    PWNED_CHECK_TOO_MANY_REQUESTS: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
    PWNED_CHECK_NETWORK_ERROR: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
    PWNED_CHECK_GENERIC: "비밀번호 보안 검사 중 오류가 발생했습니다.",
    PASSWORD_EMPTY_WARNING: "최소 하나 이상의 문자 유형을 선택해야 합니다.",
    PASSWORD_PWNED_WARNING: "이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다. 다른 비밀번호를 사용하거나, 이 비밀번호를 사용하는 다른 서비스의 비밀번호를 변경하세요.",
    PASSPHRASE_WORDS_RANGE: (min: number, max: number) => `단어는 ${min}개 이상 ${max}개 이하로 설정해주세요.`,
    PASSWORD_LENGTH_MAX: (max: number) => `비밀번호는 최대 ${max}자 이하여야 합니다.`
} as const;

