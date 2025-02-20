const PASSWORD_PATTERNS = {
    SEQUENTIAL: /(123|234|345|456|567|678|789|987|876|765|654|543|432|321)/,
    COMMON_WORDS: /password|123456|qwerty|admin/i,
    MIXED_CHARS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).$/
};

export const criteriaMap = {
    minLength: {
        test: (pwd: string) => pwd.length >= 8,
        message: "8자 이상"
    },
    recommendedLength: {
        test: (pwd: string) => pwd.length >= 12,
        message: "12자 이상 권장"
    },
    uppercase: {
        test: (pwd: string) => /[A-Z]/.test(pwd),
        message: "대문자"
    },
    lowercase: {
        test: (pwd: string) => /[a-z]/.test(pwd),
        message: "소문자"
    },
    numbers: {
        test: (pwd: string) => /[0-9]/.test(pwd),
        message: "숫자"
    },
    specialChars: {
        test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
        message: "특수문자"
    },
    sequential: {
        test: (pwd: string) => !PASSWORD_PATTERNS.SEQUENTIAL.test(pwd),
        message: "연속된 숫자 제거"
    },
    repeated: {
        test: (pwd: string) => !/(.)\1{2,}/.test(pwd),
        message: "반복된 문자 제거"
    },
    commonWords: {
        test: (pwd: string) => !PASSWORD_PATTERNS.COMMON_WORDS.test(pwd),
        message: "일반적인 패턴 제거"
    },
    mixedChars: {
        test: (pwd: string) => PASSWORD_PATTERNS.MIXED_CHARS.test(pwd),
        message: "문자 조합 다양화"
    }
};
