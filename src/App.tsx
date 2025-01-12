import { useCallback, useEffect, useState } from "react";

import PasswordInput, { PASSWORD_CHARSET } from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import IncludeCheckBox from "./components/IncludeCheckBox";
import { createCharacterSet } from "./utils/password";

interface KakaoShareOptions {
    objectType?: string;
    text: string;
    link: {
        webUrl: string;
    };
}
interface KakaoSDK {
    init: (key?: string) => void;
    isInitialized(): boolean;
    Share: {
        sendDefault(options: KakaoShareOptions): void;
    };
}

interface EmptyProps {
    lowerCase: boolean;
    upperCase: boolean;
    numberCase: boolean;
    specialCase: boolean;
}

declare global {
    interface Window {
        Kakao: KakaoSDK;
    }
}

window.Kakao.init(import.meta.env.VITE_APP_KEY);
window.Kakao.isInitialized();

const App = () => {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialCharacter, setIncludeSpecialCharacter] =
        useState(true);
    const [passwordLength, setPasswordLength] = useState(0);
    const [newPasswordResult, setNewPasswordResult] = useState("");

    const [hasRepeatingChars, setHasRepeatingChars] = useState(false);

    const isCharsetEmpty = (isChecked: boolean) => {
        return !(
            includeLowercase ||
            includeUppercase ||
            includeNumbers ||
            includeSpecialCharacter
        );
    };
    const buildPassword = (length: number, charset: string) => {
        return Array.from(
            { length },
            () => charset[Math.floor(Math.random() * charset.length)]
        ).join("");
    };

    const generatePassword = useCallback(
        (length: number) => {
            if (length <= 0) return "";
            const charset = createCharacterSet({
                lowercase: includeLowercase,
                uppercase: includeUppercase,
                numbers: includeNumbers,
                special: includeSpecialCharacter
            });
            return buildPassword(length, charset);
        },
        [
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSpecialCharacter
        ]
    );

    const hasRepeatingCharacters = (password: string, char: string) => {
        return (
            password.length >= 2 &&
            password[password.length - 1] === char &&
            password[password.length - 2] === char
        );
    };

    const generateRandomPassword = (length: number) => {
        const charset = createCharacterSet({
            lowercase: includeLowercase,
            uppercase: includeUppercase,
            numbers: includeNumbers,
            special: includeSpecialCharacter
        });

        const newPassword = generatePassword(length);

        const char =
            PASSWORD_CHARSET[
                Math.floor(Math.random() * PASSWORD_CHARSET.length)
            ];

        if (hasRepeatingCharacters(newPassword, char)) {
            setHasRepeatingChars(true);
        }

        setNewPasswordResult(newPassword);

        return newPassword;
    };

    const handlePasswordLengthChange = (value: number) => {
        setNewPasswordResult(generateRandomPassword(value));
        setPasswordLength(value);
    };

    const handleRefreshPassword = () => {
        setNewPasswordResult(generateRandomPassword(passwordLength));
    };

    const handleChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        handlePasswordLengthChange(Number(event.target.value));
    };

    const handleIncludeUppercaseChange = (isChecked: boolean) => {
        setIncludeUppercase(isChecked);
        // generateRandomPassword(passwordLength);
    };

    const handleIncludeLowercaseChange = (isChecked: boolean) => {
        setIncludeLowercase(isChecked);
        // generateRandomPassword(passwordLength);
    };

    const handleIncludeNumbersChange = (isChecked: boolean) => {
        setIncludeNumbers(isChecked);
        // generateRandomPassword(passwordLength);
    };

    const handleIncludeSpecialCharacterChange = (isChecked: boolean) => {
        setIncludeSpecialCharacter(isChecked);
        // generateRandomPassword(passwordLength);
    };

    useEffect(() => {
        if (passwordLength > 0) {
            const charset = createCharacterSet({
                lowercase: includeLowercase,
                uppercase: includeUppercase,
                numbers: includeNumbers,
                special: includeSpecialCharacter
            });
            const newPassword = buildPassword(passwordLength, charset);
            setNewPasswordResult(newPassword);
        }
    }, [generatePassword, passwordLength]);

    const shareKakao = () => {
        window.Kakao.Share.sendDefault({
            objectType: "text",
            text: newPasswordResult,
            link: {
                webUrl: "https://password--generator.vercel.app/"
            }
        });
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen transition-colors duration-200  rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-dark-bg dark:text-dark-text">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-bold">PassWord Generator</div>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <PasswordInput
                                value={newPasswordResult || ""}
                                onRefresh={handleRefreshPassword}
                            />

                            <div className="flex items-center">
                                <input
                                    type="range"
                                    className="flex cursor-pointer mr-3"
                                    id="length"
                                    placeholder="Enter password length"
                                    min="0"
                                    max="25"
                                    value={passwordLength}
                                    onChange={handleChangePassword}
                                    disabled={isCharsetEmpty(
                                        includeLowercase ||
                                            includeUppercase ||
                                            includeNumbers ||
                                            includeSpecialCharacter
                                    )}
                                />
                            </div>
                            <PasswordLength passwordLength={passwordLength} />
                        </div>
                    </div>

                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeUppercaseChange}
                        pattern="Include Uppercase"
                        checked={includeUppercase}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeLowercaseChange}
                        pattern="Include Lowercase"
                        checked={includeLowercase}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeNumbersChange}
                        pattern="Include Numbers"
                        checked={includeNumbers}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeSpecialCharacterChange}
                        pattern="Include Special Characters"
                        checked={includeSpecialCharacter}
                    />
                </div>
                <div className="p-6">
                    <button
                        onClick={shareKakao}
                        aria-label="카카오톡으로 공유하기"
                        title="카카오톡으로 공유하기"
                    >
                        <img
                            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                            alt="카카오톡 공유하기 버튼"
                        />
                    </button>
                </div>
                {hasRepeatingChars && (
                    <div className="p-6 text-red-500">
                        비밀번호에 동일한 문자가 3번 이상 반복되었습니다.
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default App;
