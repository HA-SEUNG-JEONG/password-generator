import { useState } from "react";
import { IncludeLowercase } from "./components/IncludeLowercase";
import IncludeNumbers from "./components/IncludeNumbers";
import IncludeSpecialCharacter from "./components/IncludeSpecialCharacter";
import IncludeUppercase from "./components/IncludeUppercase";
import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";

const App = () => {
    const charset = "abcdefghijklmnopqrstuvwxyz";
    const generateRandomPassword = (length: number) => {
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const [passwordLength, setPasswordLength] = useState(1);
    const [newPasswordResult, setNewPasswordResult] = useState(charset);

    const handlePasswordLengthChange = (value: number) => {
        setPasswordLength(value);
    };

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword(passwordLength);
        setNewPasswordResult(newPassword);
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-2xl font-bold">PassWord Generator</div>
                <div className="text-sm text-muted-foreground">
                    Generate a strong password using the options below
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <PasswordInput value={newPasswordResult} />
                        <PasswordLength
                            passwordLength={passwordLength}
                            onPasswordLengthChange={handlePasswordLengthChange}
                        />
                        <button
                            onClick={handleGeneratePassword}
                            className="bg-amber-200 px-[1.3rem] py-[0.4rem] font-bold rounded-md shadow-sm cursor-pointer hover:transform hover:translate-x-[0.05rem] hover:translate-y-[0.05rem] active:transform active:translate-x-[0.05rem] active:translate-y-[0.05rem]"
                        >
                            Generate
                        </button>
                    </div>
                    <div className="space-y-2">
                        <IncludeUppercase />
                        <IncludeLowercase />
                        <IncludeNumbers />
                        <IncludeSpecialCharacter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
