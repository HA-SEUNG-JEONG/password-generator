// components/PasswordGenerator/index.tsx
import { useEffect, useState } from "react";
import { checkPwnedPassword, createCharacterSet } from "../utils/password";
import PasswordDisplay from "./PasswordDisplay";
import PasswordOptions from "./options/PasswordOption";
import { css } from "../../styled-system/css";

interface CharacterOptions {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
}

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState<CharacterOptions>({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true
    });

    const [isPwned, setIsPwned] = useState<boolean | undefined>(false);

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
    const onChangeOptions = async (newOptions: {
        length?: number;
        lowercase?: boolean;
        uppercase?: boolean;
        numbers?: boolean;
        special?: boolean;
    }) => {
        const check = await checkPwnedPassword(password);
        setOptions((prevOptions) => ({
            ...prevOptions,
            ...newOptions
        }));
        setIsPwned(check);
    };

    useEffect(() => {
        handleGeneratePassword();
    }, [options]);

    return (
        // <div className="space-y-1.5 flex flex-col p-6">
        <div
            className={css({
                spaceY: "1.5",
                display: "flex",
                flexDirection: "column",
                padding: "2"
            })}
        >
            <PasswordDisplay
                password={password}
                onRefresh={handleGeneratePassword}
            />
            {isPwned && (
                <div
                    className={css({ fontSize: "sm", color: "red.500" })}
                ></div>
            )}
            <PasswordOptions options={options} onChange={onChangeOptions} />
        </div>
    );
};

export default PasswordGenerator;
