import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "../controls/PasswordControls";
import { css } from "../../../styled-system/css";

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

interface PasswordOptionsProps {
    options: CharacterOptions;
    onChange: (options: Partial<CharacterOptions>) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
    const containerStyles = css({
        spaceY: "4"
    });

    // Options for passphrase language
    const languageOptions = [
        { value: "en", label: "English" },
        { value: "ko", label: "한국어" }
    ];

    // Options for passphrase separators
    const separatorOptions = [
        { value: "-", label: "하이픈 (-)" },
        { value: " ", label: "공백 ( )" },
        { value: ".", label: "마침표 (.)" },
        { value: ",", label: "쉼표 (,)" },
        { value: "_", label: "언더스코어 (_)" }
    ];

    // Handle passphrase options change
    const handlePassphraseOptionChange = (key: string, value: any) => {
        onChange({
            passphraseOptions: {
                ...options.passphraseOptions,
                [key]: value
            }
        });
    };

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 생성 옵션"
        >
            {options.mode === "password" ? (
                <>
                    <PasswordLengthControl
                        length={options.length}
                        onLengthChange={(length) => onChange({ length })}
                    />
                    <PasswordCharacterOptions
                        options={{
                            lowercase: options.lowercase,
                            uppercase: options.uppercase,
                            numbers: options.numbers,
                            special: options.special,
                            excludeAmbiguous: options.excludeAmbiguous
                        }}
                        onOptionsChange={(newOptions) => onChange(newOptions)}
                    />
                </>
            ) : (
                <div className={css({ spaceY: "4" })}>
                    {/* Words Count */}
                    <div>
                        <label
                            className={css({
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "medium"
                            })}
                        >
                            단어 개수: {options.passphraseOptions.words}
                        </label>
                        <input
                            type="range"
                            min="3"
                            max="10"
                            value={options.passphraseOptions.words}
                            onChange={(e) =>
                                handlePassphraseOptionChange(
                                    "words",
                                    parseInt(e.target.value)
                                )
                            }
                            className={css({
                                width: "100%",
                                height: "0.5rem",
                                appearance: "none",
                                backgroundColor: "gray.200",
                                borderRadius: "0.25rem",
                                "&::-webkit-slider-thumb": {
                                    appearance: "none",
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    borderRadius: "50%",
                                    backgroundColor: "blue.500",
                                    cursor: "pointer"
                                }
                            })}
                        />
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.75rem",
                                color: "gray.500"
                            })}
                        >
                            <span>3</span>
                            <span>10</span>
                        </div>
                    </div>

                    {/* Language Selection */}
                    <div>
                        <label
                            className={css({
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "medium"
                            })}
                        >
                            언어
                        </label>
                        <select
                            value={options.passphraseOptions.language}
                            onChange={(e) =>
                                handlePassphraseOptionChange(
                                    "language",
                                    e.target.value
                                )
                            }
                            className={css({
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid",
                                borderColor: "gray.300",
                                borderRadius: "0.375rem",
                                backgroundColor: "white",
                                "&:focus": {
                                    outline: "none",
                                    borderColor: "blue.500",
                                    ring: "1px solid blue.500"
                                }
                            })}
                        >
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Separator Selection */}
                    <div>
                        <label
                            className={css({
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "medium"
                            })}
                        >
                            구분자
                        </label>
                        <select
                            value={options.passphraseOptions.separator}
                            onChange={(e) =>
                                handlePassphraseOptionChange(
                                    "separator",
                                    e.target.value
                                )
                            }
                            className={css({
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid",
                                borderColor: "gray.300",
                                borderRadius: "0.375rem",
                                backgroundColor: "white",
                                "&:focus": {
                                    outline: "none",
                                    borderColor: "blue.500",
                                    ring: "1px solid blue.500"
                                }
                            })}
                        >
                            {separatorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Additional Options */}
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem"
                        })}
                    >
                        <label
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer"
                            })}
                        >
                            <input
                                type="checkbox"
                                checked={options.passphraseOptions.capitalize}
                                onChange={(e) =>
                                    handlePassphraseOptionChange(
                                        "capitalize",
                                        e.target.checked
                                    )
                                }
                                className={css({
                                    marginRight: "0.5rem",
                                    width: "1rem",
                                    height: "1rem",
                                    cursor: "pointer"
                                })}
                            />
                            <span>단어 첫 글자 대문자로 표시</span>
                        </label>
                        <label
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer"
                            })}
                        >
                            <input
                                type="checkbox"
                                checked={
                                    options.passphraseOptions.includeNumber
                                }
                                onChange={(e) =>
                                    handlePassphraseOptionChange(
                                        "includeNumber",
                                        e.target.checked
                                    )
                                }
                                className={css({
                                    marginRight: "0.5rem",
                                    width: "1rem",
                                    height: "1rem",
                                    cursor: "pointer"
                                })}
                            />
                            <span>숫자 포함</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordOptions;
