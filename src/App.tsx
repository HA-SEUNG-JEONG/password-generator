import { useState } from "react";
import { IncludeLowercase } from "./components/checkbox/IncludeLowercase";
import IncludeNumbers from "./components/checkbox/IncludeNumbers";
import IncludeSpecialCharacter from "./components/checkbox/IncludeSpecialCharacter";
import IncludeUppercase from "./components/checkbox/IncludeUppercase";
import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";

type PasswrodPattern =
    | "lowercase"
    | "uppercase"
    | "numbers"
    | "specialcharacters";

const App = () => {
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialCharacter, setIncludeSpecialCharacter] =
        useState(true);

    const generateRandomPassword = (length: number) => {
        let charset = "";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSpecialCharacter)
            charset += "!@#$%^&*()-_=+[]{}|;:'\",.<>/?";

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const [passwordLength, setPasswordLength] = useState(1);
    const [newPasswordResult, setNewPasswordResult] = useState("");

    const handlePasswordLengthChange = (value: number) => {
        setNewPasswordResult(generateRandomPassword(value));
        setPasswordLength(value);
    };

    const handleCheckBoxChange = (
        checkboxName: PasswrodPattern,
        isChecked: boolean
    ) => {
        switch (checkboxName) {
            case "lowercase":
                setIncludeLowercase(isChecked);
                break;
            case "uppercase":
                setIncludeUppercase(isChecked);
                break;
            case "numbers":
                setIncludeNumbers(isChecked);
                break;
            case "specialcharacters":
                setIncludeSpecialCharacter(isChecked);
                break;
            default:
                break;
        }
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
                        <PasswordInput value={newPasswordResult || ""} />
                        <PasswordLength passwordLength={passwordLength} />

                        <input
                            type="range"
                            className="flex cursor-pointer"
                            id="length"
                            placeholder="Enter password length"
                            min="1"
                            max="30"
                            value={passwordLength}
                            onChange={(event) => {
                                handlePasswordLengthChange(
                                    Number(event.target.value)
                                );
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <IncludeUppercase
                            onCheckboxChange={(isChecked: boolean) =>
                                handleCheckBoxChange("uppercase", isChecked)
                            }
                        />
                        <IncludeLowercase
                            onCheckboxChange={(isChecked: boolean) =>
                                handleCheckBoxChange("lowercase", isChecked)
                            }
                        />
                        <IncludeNumbers
                            onCheckboxChange={(isChecked: boolean) =>
                                handleCheckBoxChange("numbers", isChecked)
                            }
                        />
                        <IncludeSpecialCharacter
                            onCheckboxChange={(isChecked: boolean) =>
                                handleCheckBoxChange(
                                    "specialcharacters",
                                    isChecked
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
