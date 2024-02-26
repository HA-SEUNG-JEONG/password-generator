import { useState } from "react";

import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";
import IncludeCheckBox from "./components/IncludeCheckBox";

interface KakaoLinkOptions {
    templateId: number;
    templateArgs: {
        title: string;
        description: string;
    };
}
interface KakaoSDK {
    init: (key?: string) => void;
    isInitialized(): boolean;
    Link: {
        sendCustom(options: KakaoLinkOptions): void;
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

window.Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
window.Kakao.isInitialized();

const App = () => {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialCharacter, setIncludeSpecialCharacter] =
        useState(true);
    const [passwordLength, setPasswordLength] = useState(1);
    const [newPasswordResult, setNewPasswordResult] = useState("");

    const createCharacterSet = (
        lowerCase: boolean,
        upperCase: boolean,
        numbersCase: boolean,
        specialCharacterCase: boolean
    ) => {
        const lowercaseCharacters = lowerCase
            ? "abcdefghijklmnopqrstuvwxy"
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
        generateRandomPassword(passwordLength);
    };

    const handleIncludeLowercaseChange = (isChecked: boolean) => {
        setIncludeLowercase(isChecked);
        generateRandomPassword(passwordLength);
    };

    const handleIncludeNumbersChange = (isChecked: boolean) => {
        setIncludeNumbers(isChecked);
        generateRandomPassword(passwordLength);
    };

    const handleIncludeSpecialCharacterChange = (isChecked: boolean) => {
        setIncludeSpecialCharacter(isChecked);
        generateRandomPassword(passwordLength);
    };

    const shareKakao = () => {
        window.Kakao.Link.sendCustom({
            templateId: 104457,
            templateArgs: {
                title: "비밀번호 생성기",
                description: "비밀번호를 복사해보세요."
            }
        });
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
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
                                min="1"
                                max="30"
                                value={passwordLength}
                                onChange={handleChangePassword}
                                disabled={isCharsetEmpty({
                                    lowerCase: includeLowercase,
                                    upperCase: includeUppercase,
                                    numberCase: includeNumbers,
                                    specialCase: includeSpecialCharacter
                                })}
                            />
                            <PasswordLength passwordLength={passwordLength} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <IncludeCheckBox
                            title="대문자 포함"
                            onCheckboxChange={handleIncludeUppercaseChange}
                        />
                        <IncludeCheckBox
                            title="소문자 포함"
                            onCheckboxChange={handleIncludeLowercaseChange}
                        />
                        <IncludeCheckBox
                            title="숫자 포함"
                            onCheckboxChange={handleIncludeNumbersChange}
                        />
                        <IncludeCheckBox
                            title="특수문자 포함"
                            onCheckboxChange={
                                handleIncludeSpecialCharacterChange
                            }
                        />
                        <button onClick={shareKakao}>
                            <img
                                src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                                alt="카카오링크 보내기 버튼"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
