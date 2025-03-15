import React from "react";
import { css } from "../../../styled-system/css";
import CheckboxOption from "./CheckboxOption";

const OPTIONS = [
    { key: "lowercase" as const, label: "소문자 포함", description: "a-z" },
    { key: "uppercase" as const, label: "대문자 포함", description: "A-Z" },
    { key: "numbers" as const, label: "숫자 포함", description: "0-9" },
    { key: "special" as const, label: "특수문자 포함", description: "!@#$%^&*" }
];

interface CharacterOptions {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
}

interface PasswordCharacterOptionsProps {
    options: CharacterOptions;
    onOptionsChange: (options: CharacterOptions) => void;
}

const PasswordCharacterOptions = ({
    options,
    onOptionsChange
}: PasswordCharacterOptionsProps) => {
    const containerStyles = css({
        spaceY: "2"
    });

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 문자 옵션"
        >
            {OPTIONS.map(({ key, label, description }) => (
                <CheckboxOption
                    key={key}
                    checked={options[key]}
                    onChange={(checked) =>
                        onOptionsChange({ ...options, [key]: checked })
                    }
                    label={label}
                    description={description}
                />
            ))}
        </div>
    );
};

export default PasswordCharacterOptions;
