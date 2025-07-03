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
    excludeAmbiguous: boolean;
}

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState<CharacterOptions>({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true,
        excludeAmbiguous: false
    });

    const [isPwned, setIsPwned] = useState<boolean>(false);

    const handleGeneratePassword = useCallback(async () => {
        const newPassword = generateSecurePassword(options);
        setPassword(newPassword);
        const check = await checkPwnedPassword(newPassword);
        setIsPwned(check ?? false);
    }, [options]);

    const onChangeOptions = useCallback(
        (newOptions: {
            length?: number;
            lowercase?: boolean;
            uppercase?: boolean;
            numbers?: boolean;
            special?: boolean;
            excludeAmbiguous?: boolean;
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
                padding: "3",
            }),
        []
    );

    const warningStyles = useMemo(
        () =>
            css({
                fontSize: "sm",
                color: "red.500",
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
                    이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다. 다른 비밀번호를 사용하거나, 이 비밀번호를 사용하는 다른 서비스의 비밀번호를 변경하세요.
                </div>
            )}
            <PasswordOptions options={options} onChange={onChangeOptions} />
        </div>
    );
};

export default PasswordGenerator;
