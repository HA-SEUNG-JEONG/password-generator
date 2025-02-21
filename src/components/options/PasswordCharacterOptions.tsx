import { css } from "../../../styled-system/css";
import CheckboxOption from "./CheckboxOption";

const OPTIONS = [
    { key: "lowercase" as const, label: "소문자 포함" },
    { key: "uppercase" as const, label: "대문자 포함" },
    { key: "numbers" as const, label: "숫자 포함" },
    { key: "special" as const, label: "특수문자 포함" }
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
}: PasswordCharacterOptionsProps) => (
    <div
        className={css({
            spaceY: "2"
        })}
    >
        {OPTIONS.map(({ key, label }) => (
            <CheckboxOption
                key={key}
                checked={options[key]}
                onChange={(checked) =>
                    onOptionsChange({ ...options, [key]: checked })
                }
                label={label}
            />
        ))}
    </div>
);

export default PasswordCharacterOptions;
