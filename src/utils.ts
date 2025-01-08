import { SHA1 } from "crypto-js";
import zxcvbn from "zxcvbn";

interface PasswordStrength {
    score: number;
    crackTime: string | number;
    feedback: string[];
    warning: string | null;
}

export interface onCheckboxChangeProps {
    onCheckboxChange: (isChecked: boolean) => void;
    pattern: string;
}

export const checkPwnedPassword = async (password: string) => {
    const hash = SHA1(password).toString();
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await res.text();

    return data
        .split("\n")
        .some((line) => line.startsWith(suffix.toUpperCase()));
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
