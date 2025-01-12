import { useState } from "react";

import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import IncludeCheckBox from "./components/IncludeCheckBox";

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

    const createCharacterSet = (
        lowerCase: boolean,
        upperCase: boolean,
        numbersCase: boolean,
        specialCharacterCase: boolean
    ) => {
        const lowercaseCharacters = lowerCase
            ? "abcdefghijklmnopqrstuvwxyz"
            : "";
        const uppercaseCharacters = upperCase
            ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            : "";
        const numberCharacters = numbersCase ? "0123456789" : "";
        const specialCharacter = specialCharacterCase
            ? "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
            : "";

        const characterSet =
            lowercaseCharacters +
            uppercaseCharacters +
            numberCharacters +
            specialCharacter;

        return characterSet || "";
    };

    const isCharsetEmpty = ({
        lowerCase,
        upperCase,
        numberCase,
        specialCase
    }: EmptyProps) => {
        return !lowerCase && !upperCase && !numberCase && !specialCase;
    };

    const buildPassword = (length: number, charset: string) => {
        return Array.from(
            { length },
            () => charset[Math.floor(Math.random() * charset.length)]
        ).join("");
    };

    const generateRandomPassword = (length: number) => {
        const charset = createCharacterSet(
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSpecialCharacter
        );

        const newPassword = buildPassword(length, charset);

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
    };

    const handleIncludeLowercaseChange = (isChecked: boolean) => {
        setIncludeLowercase(isChecked);
    };

    const handleIncludeNumbersChange = (isChecked: boolean) => {
        setIncludeNumbers(isChecked);
    };

    const handleIncludeSpecialCharacterChange = (isChecked: boolean) => {
        setIncludeSpecialCharacter(isChecked);
    };

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
                                    disabled={isCharsetEmpty({
                                        lowerCase: includeLowercase,
                                        upperCase: includeUppercase,
                                        numberCase: includeNumbers,
                                        specialCase: includeSpecialCharacter
                                    })}
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
                    <button onClick={shareKakao}>
                        <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" />
                    </button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
