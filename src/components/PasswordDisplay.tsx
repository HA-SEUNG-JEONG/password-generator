// components/PasswordDisplay/index.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import EyeOn from "../assets/eye-1.svg";
import EyeOff from "../assets/eye-off-1.svg";

interface PasswordDisplayProps {
    password: string;
    onRefresh: () => void;
}

interface PasswordValidationOptions {
    maxRepeats?: number;
    checkPatterns?: boolean;
    checkSequential?: boolean;
}

const PasswordDisplay = ({ password, onRefresh }: PasswordDisplayProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordCopy = async () => {
        if (!navigator.clipboard) {
            toast.error("클립보드 지원이 되지 않는 브라우저입니다.");
            return;
        }
        try {
            if (password.length === 0) toast.error("비밀번호가 비어있습니다.");
            else {
                await navigator.clipboard.writeText(password);
                toast.success("비밀번호가 복사되었습니다.");
            }
        } catch (err) {
            if (err instanceof Error) toast.error(err.message);
        }
    };

    // 특정 문자/숫자 반복 감지
    const hasRepeatingCharacters = (
        password: string,
        options: PasswordValidationOptions = {
            maxRepeats: 2,
            checkPatterns: true,
            checkSequential: true
        }
    ) => {
        // 특정 알파벳이나 특정 숫자 특정 특수문자가 2번 이상 반복되는지 확인

        const repeatingChars = new RegExp(
            `(.)\\1{${options?.maxRepeats ?? 2},}`
        );
        const sequentialPattern =
            /(?:abc|bcd|cde|def|efg|123|234|345|456|567|678|789)/i;

        if (repeatingChars.test(password)) return "반복된 문자가 있습니다";
        if (options?.checkSequential && sequentialPattern.test(password))
            return "연속된 문자나 숫자가 있습니다";
        return null;
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded"
                value={password}
                readOnly
                aria-label="생성된 비밀번호"
                aria-describedby={
                    hasRepeatingCharacters(password)
                        ? "password-warning"
                        : undefined
                }
            />
            {hasRepeatingCharacters(password) && (
                <span
                    id="password-warning"
                    role="alert"
                    className="text-xs text-red-500"
                >
                    반복되는 문자/숫자가 있습니다.
                </span>
            )}

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                <button
                    type="button"
                    aria-label={
                        showPassword ? "비밀번호 숨기기" : "비밀번호 표시"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <img
                        src={showPassword ? EyeOn : EyeOff}
                        alt="Toggle Password"
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    onClick={handlePasswordCopy}
                    className="flex items-center gap-2"
                    aria-label="복사하기"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                </button>
                <button
                    onClick={() => onRefresh()}
                    className="flex items-center gap-2"
                    aria-label="새로고침"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PasswordDisplay;
