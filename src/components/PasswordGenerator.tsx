// components/PasswordGenerator/index.tsx
import { useEffect, useState, useCallback, useMemo } from "react";
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

    const buildPassword = useCallback((length: number, charset: string) => {
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (num) => charset[num % charset.length]).join(
            ""
        );
    }, []);

    const handleGeneratePassword = useCallback(() => {
        const charset = createCharacterSet(options);
        const newPassword = buildPassword(options.length, charset);
        setPassword(newPassword);
    }, [options, buildPassword]);

    const onChangeOptions = useCallback(
        async (newOptions: {
            length?: number;
            lowercase?: boolean;
            uppercase?: boolean;
            numbers?: boolean;
            special?: boolean;
        }) => {
            if (password) {
                const check = await checkPwnedPassword(password);
                setIsPwned(check);
            }

            setOptions((prevOptions) => ({
                ...prevOptions,
                ...newOptions
            }));
        },
        [password]
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
