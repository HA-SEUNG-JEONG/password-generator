import zxcvbn from "zxcvbn";

export const PASSWORD_CHARSET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
export const DEFAULT_PASSWORD_LENGTH = 16;

export const createCharacterSet = (options: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
}) => {
    const { lowercase, uppercase, numbers, special } = options;
    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (special) charset += "!@#$%^&*()-_=+[]{}|;:'\",.<>/?";
    return charset;
};

export const hasRepeatingCharacters = (password: string) => {
    for (let i = 0; i < password.length - 2; i++) {
        if (
            password[i] === password[i + 1] &&
            password[i] === password[i + 2]
        ) {
            return true;
        }
    }
    return false;
};

export const generatePassword = (length: number, charset: string) => {
    let password = "";
    let hasRepeatingChars = false;

    while (password.length < length) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        if (hasRepeatingCharacters(password)) {
            hasRepeatingChars = true;
            continue;
        }
        password += char;
    }

    return { password, hasRepeatingChars };
};

interface PasswordStrength {
    score: number;
    crackTime: string | number;
    feedback: string[];
    warning: string | null;
}
const generateSha1 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export interface onCheckboxChangeProps {
    onCheckboxChange: (isChecked: boolean) => void;
    pattern: string;
}

export const checkPwnedPassword = async (password: string) => {
    try {
        const hash = await generateSha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);

        const res = await fetch(
            `https://api.pwnedpasswords.com/range/${prefix}`
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.text();

        return data
            .split("\n")
            .some((line) => line.startsWith(suffix.toUpperCase()));
    } catch (error) {
        console.error("Password check failed:", error);
        return false;
    }
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
    const result = zxcvbn(password);

    return {
        score: result.score,
        crackTime:
            result.crack_times_display.offline_slow_hashing_1e4_per_second,
        feedback: result.feedback.suggestions,
        warning: result.feedback.warning
    };
};

// 비밀번호 생성 함수
export const generateSecurePassword = (length: number = 16): string => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*";
    const allChars = uppercase + lowercase + numbers + special;

    let password = "";

    // 각 문자 유형별로 최소 1개씩 포함
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // 나머지 길이만큼 랜덤 문자 추가
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // 문자열을 랜덤하게 섞기
    return password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
};
