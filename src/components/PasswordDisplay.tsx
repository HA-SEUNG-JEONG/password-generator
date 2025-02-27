import { useState } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import RefreshIcon from "./RefreshIcon";
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
                className={css({
                    width: "full",
                    padding: "2",
                    border: "1px solid token(colors.gray.300)",
                    borderRadius: "md",
                    marginBottom: "2",
                    _focusVisible: {
                        outline: "2px solid token(colors.blue.500)"
                    }
                })}
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
                    className={css({
                        fontSize: "sm",
                        color: "red.600",
                        fontWeight: "semibold",
                        marginBottom: "2"
                    })}
                >
                    반복되는 문자/숫자가 있습니다.
                </span>
            )}

            <div
                className={css({
                    position: "absolute",
                    right: "5",
                    top: "8",
                    transform: "translateY(-50%)",
                    display: "flex",
                    gap: 2
                })}
            >
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
                    className={css({
                        alignItems: "center",
                        gap: 2,
                        display: "flex"
                    })}
                    aria-label="복사하기"
                >
                    <CopyIcon />
                </button>
                <button
                    onClick={() => onRefresh()}
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "2"
                    })}
                    aria-label="새로고침"
                >
                    <RefreshIcon />
                </button>
            </div>
            <PasswordStrengthIndicator password={password} />
        </div>
    );
};

export default PasswordDisplay;
