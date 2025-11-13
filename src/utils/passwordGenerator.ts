import { toast } from "react-toastify";
import { PASSPHRASE_CONFIG, DEFAULT_PASSPHRASE_OPTIONS } from "../constants/passwordConfig";
import { ERROR_MESSAGES } from "../constants/messages";
import { CHARACTER_SETS, removeAmbiguousChars } from "../constants/characterSets";
import { wordLists } from "../constants/wordLists";
import { PassphraseOptions } from "../types/password";
import { isNetworkError, isRateLimitError } from "../types/errors";

/**
 * SHA-1 해시 생성
 */
const generateSha1 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

/**
 * Have I Been Pwned API를 사용하여 비밀번호가 유출되었는지 확인
 * Exponential backoff를 사용한 재시도 로직 포함
 */
export const checkPwnedPassword = async (password: string): Promise<boolean> => {
    const delay = (ms: number): Promise<void> =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const MAX_RETRIES = 3;
    let retries = 0;

    try {
        const hash = await generateSha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        while (retries < MAX_RETRIES) {
            try {
                const res = await fetch(
                    `https://api.pwnedpasswords.com/range/${prefix}`
                );

                if (res.status === 429) {
                    retries++;
                    await delay(Math.pow(2, retries) * 1000);
                    continue;
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.text();
                return data
                    .split("\n")
                    .some((line) => line.startsWith(suffix.toUpperCase()));
            } catch (error) {
                retries++;
                if (retries === MAX_RETRIES) {
                    if (isRateLimitError(error)) {
                        throw new Error(ERROR_MESSAGES.PWNED_CHECK_TOO_MANY_REQUESTS);
                    }
                    if (isNetworkError(error)) {
                        throw new Error(ERROR_MESSAGES.PWNED_CHECK_NETWORK_ERROR);
                    }
                    throw new Error(ERROR_MESSAGES.PWNED_CHECK_GENERIC);
                }
                await delay(Math.pow(2, retries) * 1000);
            }
        }

        throw new Error(ERROR_MESSAGES.PWNED_CHECK_GENERIC);
    } catch (error) {
        console.error("Password check failed:", error);
        throw error;
    }
};

/**
 * 암호학적으로 안전한 난수 생성
 */
const getSecureRandom = (max: number): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return Math.floor((array[0] / (0xffffffff + 1)) * max);
};


export const generateSecurePassphrase = (
    options?: Partial<PassphraseOptions>
): string => {
    const { words, language, separator, capitalize, includeNumber } = {
        ...DEFAULT_PASSPHRASE_OPTIONS,
        ...options
    };

    if (words < PASSPHRASE_CONFIG.MIN_WORDS_LENGTH || words > PASSPHRASE_CONFIG.MAX_WORDS_LENGTH) {
        toast(ERROR_MESSAGES.PASSPHRASE_WORDS_RANGE(PASSPHRASE_CONFIG.MIN_WORDS_LENGTH, PASSPHRASE_CONFIG.MAX_WORDS_LENGTH));
    }

    if (!wordLists[language]) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const wordList = wordLists[language];
    const selectedWords: string[] = [];

    for (let i = 0; i < words; i++) {
        const randomIndex = getSecureRandom(wordList.length);
        let word = wordList[randomIndex];

        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        selectedWords.push(word);
    }

    if (includeNumber) {
        const randomNumber = getSecureRandom(90) + 10; // 10-99
        const insertAt = getSecureRandom(selectedWords.length + 1);
        selectedWords.splice(insertAt, 0, randomNumber.toString());
    }

    return selectedWords.join(separator);
};

/**
 * 모호한 문자 제외 옵션에 따라 문자셋 반환
 */
const getCharacterSets = (excludeAmbiguous: boolean) => {
    const lowercase = excludeAmbiguous
        ? removeAmbiguousChars(CHARACTER_SETS.LOWERCASE)
        : CHARACTER_SETS.LOWERCASE;
    const uppercase = excludeAmbiguous
        ? removeAmbiguousChars(CHARACTER_SETS.UPPERCASE)
        : CHARACTER_SETS.UPPERCASE;
    const numbers = excludeAmbiguous
        ? removeAmbiguousChars(CHARACTER_SETS.NUMBERS)
        : CHARACTER_SETS.NUMBERS;
    const special = excludeAmbiguous
        ? removeAmbiguousChars(CHARACTER_SETS.SPECIAL)
        : CHARACTER_SETS.SPECIAL;

    return { lowercase, uppercase, numbers, special };
};

/**
 * 선택된 옵션에 따라 사용 가능한 모든 문자를 결합
 */
const buildCharacterPool = (
    characterSets: ReturnType<typeof getCharacterSets>,
    options: { lowercase: boolean; uppercase: boolean; numbers: boolean; special: boolean }
): string => {
    let pool = "";
    if (options.lowercase) pool += characterSets.lowercase;
    if (options.uppercase) pool += characterSets.uppercase;
    if (options.numbers) pool += characterSets.numbers;
    if (options.special) pool += characterSets.special;
    return pool;
};

/**
 * 각 문자 유형을 최소 1개씩 포함하는 비밀번호 생성
 */
const generatePasswordWithGuaranteedTypes = (
    length: number,
    characterSets: ReturnType<typeof getCharacterSets>,
    options: { lowercase: boolean; uppercase: boolean; numbers: boolean; special: boolean },
    allChars: string
): string => {
    const passwordChars: string[] = [];

    // 각 문자 유형별로 최소 1개씩 포함 (선택된 경우에만)
    if (options.lowercase && characterSets.lowercase.length > 0) {
        passwordChars.push(getRandomChar(characterSets.lowercase));
    }
    if (options.uppercase && characterSets.uppercase.length > 0) {
        passwordChars.push(getRandomChar(characterSets.uppercase));
    }
    if (options.numbers && characterSets.numbers.length > 0) {
        passwordChars.push(getRandomChar(characterSets.numbers));
    }
    if (options.special && characterSets.special.length > 0) {
        passwordChars.push(getRandomChar(characterSets.special));
    }

    // 나머지 길이만큼 랜덤 문자 추가
    for (let i = passwordChars.length; i < length; i++) {
        passwordChars.push(getRandomChar(allChars));
    }

    return passwordChars.join("");
};

/**
 * 문자 유형 보장 없이 랜덤 비밀번호 생성
 * (요청된 길이가 선택된 문자 유형 수보다 작은 경우 사용)
 */
const generatePasswordWithoutGuaranteedTypes = (
    length: number,
    allChars: string
): string => {
    const passwordChars: string[] = [];
    for (let i = 0; i < length; i++) {
        passwordChars.push(getRandomChar(allChars));
    }
    return passwordChars.join("");
};

export const generateSecurePassword = (options: {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    excludeAmbiguous: boolean;
    mode?: "password" | "passphrase";
    passphraseOptions?: Partial<PassphraseOptions>;
}): string => {
    const { mode = "password", passphraseOptions } = options;

    if (mode === "passphrase") {
        return generateSecurePassphrase(passphraseOptions);
    }

    const { length, lowercase, uppercase, numbers, special, excludeAmbiguous } = options;

    const characterSets = getCharacterSets(excludeAmbiguous);
    const allChars = buildCharacterPool(characterSets, {
        lowercase,
        uppercase,
        numbers,
        special
    });

    if (allChars.length === 0) {
        return "";
    }

    const selectedTypes = [lowercase, uppercase, numbers, special].filter(Boolean).length;

    // 요청된 길이가 선택된 문자 유형 수보다 작은 경우
    if (length < selectedTypes) {
        return generatePasswordWithoutGuaranteedTypes(length, allChars);
    }

    return generatePasswordWithGuaranteedTypes(
        length,
        characterSets,
        { lowercase, uppercase, numbers, special },
        allChars
    );
};

/**
 * 문자셋에서 랜덤 문자 선택
 */
const getRandomChar = (charset: string): string => {
    const randomIndex = getSecureRandom(charset.length);
    return charset[randomIndex];
};

