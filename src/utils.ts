import zxcvbn from "zxcvbn";

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

interface PasswordValidationResult {
    isValid: boolean;
    message: string;
}

export const checkPasswordCollision = (
    password: string
): PasswordValidationResult => {
    // SHA-256 해시 함수를 사용하여 비밀번호 해시 생성
    const hashPassword = async (pwd: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    // 비밀번호 복잡도 검사
    const checkComplexity = (pwd: string): boolean => {
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNumbers = /\d/.test(pwd);
        const hasSpecialChars = /[!@#$%^&*]/.test(pwd);
        return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
    };

    // 비밀번호 길이 검사
    if (password.length < 8 || password.length > 128) {
        return {
            isValid: false,
            message: "비밀번호는 8자에서 128자 사이여야 합니다."
        };
    }

    // 비밀번호 복잡도 검사
    if (!checkComplexity(password)) {
        return {
            isValid: false,
            message:
                "비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
        };
    }

    return {
        isValid: true,
        message: "유효한 비밀번호입니다."
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
