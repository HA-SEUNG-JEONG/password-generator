// components/PasswordGenerator/index.tsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { checkPwnedPassword, generateSecurePassword } from "../utils/password";
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

    const handleGeneratePassword = useCallback(async () => {
        const newPassword = generateSecurePassword(options.length);
        setPassword(newPassword);
        const check = await checkPwnedPassword(newPassword);
        setIsPwned(check);
    }, [options.length]);

    const onChangeOptions = useCallback(
        (newOptions: {
            length?: number;
            lowercase?: boolean;
            uppercase?: boolean;
            numbers?: boolean;
            special?: boolean;
        }) => {
            setOptions((prevOptions) => ({
                ...prevOptions,
                ...newOptions
            }));
        },
        []
    );

    useEffect(() => {
        handleGeneratePassword();
    }, [handleGeneratePassword]);

    const containerStyles = useMemo(
        () =>
            css({
                spaceY: "1.5",
                display: "flex",
                flexDirection: "column",
                padding: "3"
            }),
        []
    );

    const warningStyles = useMemo(
        () =>
            css({
                fontSize: "sm",
                color: "red.500"
            }),
        []
    );

    return (
        <div className={containerStyles}>
            <PasswordDisplay
                password={password}
                onRefresh={handleGeneratePassword}
            />
            {isPwned && (
                <div className={warningStyles}>
                    이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다.
                </div>
            )}
            <PasswordOptions options={options} onChange={onChangeOptions} />
        </div>
    );
};

export default PasswordGenerator;
