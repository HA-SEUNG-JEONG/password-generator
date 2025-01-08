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
