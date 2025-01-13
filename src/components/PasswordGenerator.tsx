// components/PasswordGenerator/index.tsx
import { useEffect, useState } from "react";
import { createCharacterSet, generatePassword } from "../utils/password";
import PasswordDisplay from "./PasswordDisplay";
import PasswordOptions from "./PasswordOption";

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true
    });

    const buildPassword = (length: number, charset: string) => {
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (num) => charset[num % charset.length]).join(
            ""
        );
    };

    const handleGeneratePassword = () => {
        const charset = createCharacterSet(options);

        const newPassword = buildPassword(options.length, charset);
        setPassword(newPassword);
    };

    useEffect(() => {
        handleGeneratePassword();
    }, [options]);

    return (
        <div className="space-y-1.5 flex flex-col p-6">
            <PasswordDisplay
                password={password}
                onRefresh={handleGeneratePassword}
            />
            <PasswordOptions options={options} onChange={setOptions} />
        </div>
    );
};

export default PasswordGenerator;
