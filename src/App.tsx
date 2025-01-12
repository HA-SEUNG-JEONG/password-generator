import { useCallback, useEffect, useState } from "react";

import PasswordInput, { PASSWORD_CHARSET } from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import IncludeCheckBox from "./components/IncludeCheckBox";
import { createCharacterSet, generatePassword } from "./utils/password";

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
    const [includePattern, setIncludePattern] = useState({
        includeLowerCase: true,
        includeUpperCase: true,
        includeNumberCase: true,
        includeSpecialCase: true
    });
    const [passwordLength, setPasswordLength] = useState(0);
    const [newPasswordResult, setNewPasswordResult] = useState("");

    const [hasRepeatingChars, setHasRepeatingChars] = useState(false);

    const isCharsetEmpty = (isChecked: boolean) => {
        return (
            !includePattern.includeLowerCase &&
            !includePattern.includeUpperCase &&
            !includePattern.includeNumberCase &&
            !includePattern.includeSpecialCase
        );
    };
    const buildPassword = (length: number, charset: string) => {
        return Array.from(
            { length },
            () => charset[Math.floor(Math.random() * charset.length)]
        ).join("");
    };

    const generateRandomPassword = (length: number) => {
        const { password, hasRepeatingChars } = generatePassword(
            length,
            PASSWORD_CHARSET
        );
        setHasRepeatingChars(hasRepeatingChars);
        setNewPasswordResult(password);

        return password;
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
        setIncludePattern({ ...includePattern, includeUpperCase: isChecked });
    };

    const handleIncludeLowercaseChange = (isChecked: boolean) => {
        setIncludePattern({ ...includePattern, includeLowerCase: isChecked });
    };

    const handleIncludeNumbersChange = (isChecked: boolean) => {
        setIncludePattern({ ...includePattern, includeNumberCase: isChecked });
    };

    const handleIncludeSpecialCharacterChange = (isChecked: boolean) => {
        setIncludePattern({ ...includePattern, includeSpecialCase: isChecked });
    };

    useEffect(() => {
        if (passwordLength > 0) {
            const charset = createCharacterSet({
                lowercase: includePattern.includeLowerCase,
                uppercase: includePattern.includeUpperCase,
                numbers: includePattern.includeNumberCase,
                special: includePattern.includeSpecialCase
            });
            const newPassword = buildPassword(passwordLength, charset);
            setNewPasswordResult(newPassword);
        }
    }, [
        generatePassword,
        passwordLength,
        includePattern.includeLowerCase,
        includePattern.includeUpperCase,
        includePattern.includeNumberCase,
        includePattern.includeSpecialCase
    ]);

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
                                        includePattern.includeLowerCase ||
                                            includePattern.includeUpperCase ||
                                            includePattern.includeNumberCase ||
                                            includePattern.includeSpecialCase
                                    )}
                                />
                            </div>
                            <PasswordLength passwordLength={passwordLength} />
                        </div>
                    </div>

                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeUppercaseChange}
                        pattern="대문자 포함"
                        checked={includePattern.includeUpperCase}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeLowercaseChange}
                        pattern="소문자 포함"
                        checked={includePattern.includeLowerCase}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeNumbersChange}
                        pattern="숫자 포함"
                        checked={includePattern.includeNumberCase}
                    />
                    <IncludeCheckBox
                        onCheckboxChange={handleIncludeSpecialCharacterChange}
                        pattern="특수 문자 포함"
                        checked={includePattern.includeSpecialCase}
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
