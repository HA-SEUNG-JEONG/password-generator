import { useEffect, useState, useCallback } from "react";
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
    mode: "password" | "passphrase";
    passphraseOptions: {
        words: number;
        language: string;
        separator: string;
        capitalize: boolean;
        includeNumber: boolean;
    };
}

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [options, setOptions] = useState<CharacterOptions>({
        length: 12,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true,
        excludeAmbiguous: false,
        mode: "password",
        passphraseOptions: {
            words: 4,
            language: "en",
            separator: "-",
            capitalize: true,
            includeNumber: true
        }
    });

    const [isPwned, setIsPwned] = useState<boolean>(false);

    const handleGeneratePassword = useCallback(async () => {
        const newPassword = generateSecurePassword({
            ...options,
            passphraseOptions:
                options.mode === "passphrase"
                    ? options.passphraseOptions
                    : undefined
        });
        setPassword(newPassword);
        const check = await checkPwnedPassword(newPassword);
        setIsPwned(check ?? false);
    }, [options]);

    const onChangeOptions = useCallback(
        (newOptions: Partial<CharacterOptions>) => {
            setOptions((prevOptions) => ({
                ...prevOptions,
                ...newOptions,
                passphraseOptions: {
                    ...prevOptions.passphraseOptions,
                    ...(newOptions.passphraseOptions || {})
                }
            }));
        },
        []
    );

    useEffect(() => {
        handleGeneratePassword();
    }, [handleGeneratePassword]);

    const containerStyles = css({
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1.5rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    });

    const titleStyles = css({
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center"
    });

    return (
        <div className={containerStyles}>
            <h1 className={titleStyles}>비밀번호 생성기</h1>

            {/* Mode Toggle */}
            <div className={css({ marginBottom: "1rem" })}>
                <label className={css({ marginRight: "1rem" })}>
                    <input
                        type="radio"
                        checked={options.mode === "password"}
                        onChange={() => onChangeOptions({ mode: "password" })}
                        className={css({ marginRight: "0.5rem" })}
                    />
                    일반 비밀번호
                </label>
                <label>
                    <input
                        type="radio"
                        checked={options.mode === "passphrase"}
                        onChange={() => {
                            // Generate a new passphrase when switching to passphrase mode
                            onChangeOptions({
                                mode: "passphrase",
                                ...(options.mode !== "passphrase" && {
                                    passphraseOptions: {
                                        ...options.passphraseOptions,
                                        // Reset to default values when switching to passphrase mode
                                        words: 4,
                                        language: "en",
                                        separator: "-",
                                        capitalize: true,
                                        includeNumber: true
                                    }
                                })
                            });
                        }}
                        className={css({
                            marginRight: "0.5rem",
                            marginLeft: "1rem"
                        })}
                    />
                    패스프레이즈
                </label>
            </div>

            <PasswordDisplay
                password={password}
                onGenerate={handleGeneratePassword}
                isPwned={isPwned}
            />

            <PasswordOptions options={options} onChange={onChangeOptions} />
        </div>
    );
};

export default PasswordGenerator;
