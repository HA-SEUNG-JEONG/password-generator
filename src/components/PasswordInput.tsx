import { toast } from "react-toastify";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useContext, useEffect, useState } from "react";
import Eye from "../../src/assets/eye-1.svg";
import EyeOff from "../../src/assets/eye-off-1.svg";
import { checkPwnedPassword } from "../utils/password";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../../src/assets/sun.svg";
import moon from "../../src/assets/moon.svg";
import { hasRepeatingCharacters } from "../utils/password";

interface PasswordInputProps {
    value: string;
    onRefresh: (value?: string) => void;
}

export const PASSWORD_CHARSET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const PasswordInput = ({ value }: PasswordInputProps) => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { theme, toggleTheme } = themeContext;
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(EyeOff);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(Eye);
            setType("text");
        } else {
            setIcon(EyeOff);
            setType("password");
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">
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
                        <img
                            src={sun}
                            alt="sun"
                            className="w-6 h-6 dark:invert"
                        />
                    )}
                </button>
                {hasRepeatingCharacters(value) && (
                    <div className="text-red-500 text-sm mt-2">
                        {value.length !== 0 &&
                            "이 비밀번호는 연속된 문자가 포함됩니다."}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <div className="relative w-full">
                    <input
                        className="mb-8 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-input dark:border-dark-border"
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
                    </div>
                </div>
                <PasswordStrengthIndicator password={value} />
            </div>
        </>
    );
};

export default PasswordInput;
