import { Messages } from "../constants/locales/types";

const PASSWORD_PATTERNS = {
    SEQUENTIAL: /(123|234|345|456|567|678|789|987|876|765|654|543|432|321)/,
    COMMON_WORDS: /password|123456|qwerty|admin/i,
    MIXED_CHARS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/
};

export interface CriteriaMap {
    [key: string]: {
        test: (pwd: string) => boolean;
        message: string;
    };
}

export const buildCriteriaMap = (criteriaMessages: Messages["criteria"]): CriteriaMap => ({
    minLength: {
        test: (pwd: string) => pwd.length >= 8,
        message: criteriaMessages.minLength
    },
    recommendedLength: {
        test: (pwd: string) => pwd.length >= 12,
        message: criteriaMessages.recommendedLength
    },
    uppercase: {
        test: (pwd: string) => /[A-Z]/.test(pwd),
        message: criteriaMessages.uppercase
    },
    lowercase: {
        test: (pwd: string) => /[a-z]/.test(pwd),
        message: criteriaMessages.lowercase
    },
    numbers: {
        test: (pwd: string) => /[0-9]/.test(pwd),
        message: criteriaMessages.numbers
    },
    specialChars: {
        test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd),
        message: criteriaMessages.specialChars
    },
    sequential: {
        test: (pwd: string) => !PASSWORD_PATTERNS.SEQUENTIAL.test(pwd),
        message: criteriaMessages.sequential
    },
    repeated: {
        test: (pwd: string) => !/(.)\1{2,}/.test(pwd),
        message: criteriaMessages.repeated
    },
    commonWords: {
        test: (pwd: string) => !PASSWORD_PATTERNS.COMMON_WORDS.test(pwd),
        message: criteriaMessages.commonWords
    },
    mixedChars: {
        test: (pwd: string) => PASSWORD_PATTERNS.MIXED_CHARS.test(pwd),
        message: criteriaMessages.mixedChars
    }
});
