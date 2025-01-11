import { toast } from "react-toastify";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useContext, useEffect, useState } from "react";
import Eye from "../../src/assets/eye-1.svg";
import EyeOff from "../../src/assets/eye-off-1.svg";
import { checkPwnedPassword } from "../utils";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../../src/assets/sun.svg";
import moon from "../../src/assets/moon.svg";

interface PasswordInputProps {
    value: string;
    onRefresh: () => void;
}

interface PasswordRule {
    id: string;
    name: string;
    isEnabled: boolean;
    pattern: RegExp | ((value: string) => boolean);
    message: string;
}

const PASSWORD_RULES: PasswordRule[] = [
    {
        id: "uppercase",
        name: "대문자 포함",
        isEnabled: true,
        pattern: /[A-Z]/,
        message: "대문자 포함"
    },
    {
        id: "lowercase",
        name: "소문자 포함",
        isEnabled: true,
        pattern: /[a-z]/,
        message: "소문자 포함"
    },
    {
        id: "numbers",
        name: "숫자 포함",
        isEnabled: true,
        pattern: /[0-9]/,
        message: "숫자 포함"
    },
    {
        id: "special",
        name: "특수문자 포함",
        isEnabled: true,
        pattern: /[^A-Za-z0-9]/,
        message: "특수문자 포함"
    }
];

const PasswordInput = ({ value, onRefresh }: PasswordInputProps) => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { theme, toggleTheme } = themeContext;
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(EyeOff);

    const [isPwned, setIsPwned] = useState(false);
    const savePasswordRules = () => {
        try {
            const savedRules = localStorage.getItem("passwordRules");
            return savedRules ? JSON.parse(savedRules) : PASSWORD_RULES;
        } catch (error) {
            console.error(
                "비밀번호 규칙을 불러오는 중 오류가 발생했습니다:",
                error
            );
            return PASSWORD_RULES;
        }
    };

    const [rules, setRules] = useState<PasswordRule[]>(savePasswordRules);

    const updateRule = (ruleId: string, isEnabled: boolean) => {
        const updatedRules = rules.map((rule) =>
            rule.id === ruleId ? { ...rule, isEnabled } : rule
        );
        const hasEnabledRule = updatedRules.some((rule) => rule.isEnabled);
        if (hasEnabledRule) {
            // const enabledRules = updatedRules.filter((rule) => rule.isEnabled);
            setRules(updatedRules);
            // localStorage.setItem("passwordRules", JSON.stringify(enabledRules));
            try {
                const enabledRules = updatedRules.filter(
                    (rule) => rule.isEnabled
                );
                localStorage.setItem(
                    "passwordRules",
                    JSON.stringify(enabledRules)
                );
            } catch (error) {
                console.error(
                    "비밀번호 규칙을 저장하는 중 오류가 발생했습니다:",
                    error
                );
            }
        }
    };

    useEffect(() => {
        const checkPassword = async () => {
            if (value.length > 0) {
                const pwned = await checkPwnedPassword(value);
                setIsPwned(pwned);
            }
        };
        checkPassword();
    }, [value]);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(Eye);
            setType("text");
        } else {
            setIcon(EyeOff);
            setType("password");
        }
    };

    const handlePasswordCopy = () => {
        try {
            if (value.length === 0) toast.error("비밀번호가 비어있습니다.");
            else {
                navigator.clipboard.writeText(value);
                toast.success("비밀번호가 복사되었습니다.");
            }
        } catch (err) {
            if (err instanceof Error) toast.error(err.message);
        }
    };

    const handleRefreshPassword = () => {
        onRefresh();
    };
    return (
        <>
            <button
                onClick={toggleTheme}
                aria-label={
                    theme === "light"
                        ? "다크 모드로 전환"
                        : "라이트 모드로 전환"
                }
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                {theme === "light" ? (
                    <img
                        src={moon}
                        alt="moon"
                        className="w-6 h-6 dark:invert"
                    />
                ) : (
                    <img src={sun} alt="sun" className="w-6 h-6 dark:invert" />
                )}
            </button>
            <div className="flex flex-col gap-2">
                <div className="relative w-full">
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-input dark:border-dark-border"
                        type={type}
                        id="password"
                        readOnly
                        value={value ?? ""}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-end items-center gap-2">
                        <div className=" hover:text-gray-600 cursor-pointer">
                            <button
                                onClick={handleToggle}
                                className="p-1"
                                aria-label={
                                    type === "password"
                                        ? "비밀번호 표시"
                                        : "비밀번호 숨기기"
                                }
                            >
                                <img
                                    src={icon}
                                    alt=""
                                    className="w-6 h-6 dark:invert"
                                />
                            </button>
                        </div>

                        <button
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

                        {/* 복사하기 버튼 */}
                        <button
                            onClick={handleRefreshPassword}
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
                {isPwned && (
                    <div className="text-red-500 text-sm mt-2">
                        {value.length !== 0 &&
                            "이 비밀번호는 알려진 비밀번호입니다."}
                    </div>
                )}
            </div>
            <PasswordStrengthIndicator password={value} />
            {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={rule.id}
                        checked={rule.isEnabled}
                        onChange={(e) => updateRule(rule.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={rule.id} className="text-sm">
                        {rule.name}
                    </label>
                </div>
            ))}
        </>
    );
};

export default PasswordInput;
