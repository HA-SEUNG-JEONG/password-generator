import { toast } from "react-toastify";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useEffect, useState } from "react";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { checkPwnedPassword } from "../utils";
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
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const [isPwned, setIsPwned] = useState(false);
    const [rules, setRules] = useState<PasswordRule[]>(() => {
        const savedRules = localStorage.getItem("passwordRules");
        return savedRules ? JSON.parse(savedRules) : PASSWORD_RULES;
    });

    const updateRule = (ruleId: string, isEnabled: boolean) => {
        const updatedRules = rules.map((rule) =>
            rule.id === ruleId ? { ...rule, isEnabled } : rule
        );
        const hasEnabledRule = updatedRules.some((rule) => rule.isEnabled);
        if (hasEnabledRule) {
            const enabledRules = updatedRules.filter((rule) => rule.isEnabled);
            setRules(updatedRules);
            localStorage.setItem("passwordRules", JSON.stringify(enabledRules));
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
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
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
            <div className="relative">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                >
                    비밀번호
                </label>

                <input
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type={type}
                    id="password"
                    readOnly
                    value={value ?? ""}
                />

                <div className="flex justify-end items-center">
                    <div className="right-[4.5rem] bottom-2 absolute hover:text-gray-600 cursor-pointer">
                        <Icon icon={icon} size={20} onClick={handleToggle} />
                    </div>

                    <button
                        onClick={handlePasswordCopy}
                        className="cursor-pointer hover:opacity-40 absolute right-10 top-[70%] transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
                        className="cursor-pointer hover:opacity-40 absolute right-3 top-[70%] transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
