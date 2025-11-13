import { toast } from "react-toastify";
import { PASSPHRASE_CONFIG } from "../constants/passwordConfig";

const generateSha1 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const checkPwnedPassword = async (password: string) => {
    const delay = (ms: number) =>
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
                } else if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.text();
                return data
                    .split("\n")
                    .some((line) => line.startsWith(suffix.toUpperCase()));
            } catch (error) {
                retries++;
                if (retries === MAX_RETRIES) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
                        throw new Error("429");
                    }
                    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
                        throw new Error("network");
                    }
                    throw error;
                }
                await delay(Math.pow(2, retries) * 1000);
            }
        }
    } catch (error) {
        console.error("Password check failed:", error);
        throw error;
    }
};

const getSecureRandom = (max: number) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return Math.floor((array[0] / (0xffffffff + 1)) * max);
};

const secureShuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandom(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// 비밀번호 생성 함수
interface PassphraseOptions {
    words: number;
    language: string;
    separator: string;
    capitalize: boolean;
    includeNumber: boolean;
}

const defaultPassphraseOptions: PassphraseOptions = {
    words: 5,
    language: "en",
    separator: " ",
    capitalize: false,
    includeNumber: false
};

const wordLists: { [key: string]: string[] } = {
    en: [
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
        "grape",
        "honeydew",
        "ice cream",
        "jackfruit",
        "kiwi",
        "lemon",
        "mango",
        "nectarine",
        "orange",
        "pineapple",
        "quince",
        "raspberry",
        "strawberry",
        "tangerine",
        "ugli fruit",
        "victoria plum",
        "watermelon",
        "xigua",
        "yellow passionfruit",
        "zucchini"
    ]
};

export const generateSecurePassphrase = (
    options?: Partial<PassphraseOptions>
): string => {
    const { words, language, separator, capitalize, includeNumber } = {
        ...defaultPassphraseOptions,
        ...options
    };

    if (words < PASSPHRASE_CONFIG.MIN_WORDS_LENGTH || words > PASSPHRASE_CONFIG.MAX_WORDS_LENGTH) {
        // throw new Error("Number of words must be between 3 and 10");
        toast(`단어는 ${PASSPHRASE_CONFIG.MIN_WORDS_LENGTH}개 이상 ${PASSPHRASE_CONFIG.MAX_WORDS_LENGTH}개 이하로 설정해주세요.`);
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

    const { length, lowercase, uppercase, numbers, special, excludeAmbiguous } =
        options;

    let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*";

    if (excludeAmbiguous) {
        lowercaseChars = lowercaseChars.replace(/[l1o0iOI]/g, "");
        uppercaseChars = uppercaseChars.replace(/[l1o0iOI]/g, "");
        numberChars = numberChars.replace(/[l1o0iOI]/g, "");
        specialChars = specialChars.replace(/[l1o0iOI]/g, "");
    }

    let allChars = "";
    if (lowercase) allChars += lowercaseChars;
    if (uppercase) allChars += uppercaseChars;
    if (numbers) allChars += numberChars;
    if (special) allChars += specialChars;

    if (allChars.length === 0) {
        return ""; // 모든 옵션이 비활성화된 경우 빈 문자열 반환
    }

    const selectedTypes = [lowercase, uppercase, numbers, special].filter(
        Boolean
    ).length;

    // 요청된 길이가 선택된 문자 유형 수보다 작은 경우 처리
    if (length < selectedTypes) {
        let passwordChars: string[] = [];
        for (let i = 0; i < length; i++) {
            passwordChars.push(getRandomChar(allChars));
        }
        return secureShuffleArray(passwordChars).join("");
    }

    const passwordChars: string[] = [];

    // 각 문자 유형별로 최소 1개씩 포함 (선택된 경우에만)
    if (lowercase && lowercaseChars.length > 0)
        passwordChars.push(getRandomChar(lowercaseChars));
    if (uppercase && uppercaseChars.length > 0)
        passwordChars.push(getRandomChar(uppercaseChars));
    if (numbers && numberChars.length > 0)
        passwordChars.push(getRandomChar(numberChars));
    if (special && specialChars.length > 0)
        passwordChars.push(getRandomChar(specialChars));

    // 나머지 길이만큼 랜덤 문자 추가
    for (let i = passwordChars.length; i < length; i++) {
        passwordChars.push(getRandomChar(allChars));
    }

    // 문자열을 랜덤하게 섞기
    return secureShuffleArray(passwordChars).join("");
};

function getRandomChar(charset: string): string {
    const randomIndex = getSecureRandom(charset.length);
    return charset[randomIndex];
}

