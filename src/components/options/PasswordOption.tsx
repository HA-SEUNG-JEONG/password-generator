import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "../controls/PasswordControls";
import { css } from "../../../styled-system/css";

interface CharacterOptions {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    excludeAmbiguous: boolean;
}

interface PasswordOptionsProps {
    options: {
        length: number;
    } & CharacterOptions;
    onChange: (options: {
        length?: number;
        lowercase?: boolean;
        uppercase?: boolean;
        numbers?: boolean;
        special?: boolean;
        excludeAmbiguous?: boolean;
    }) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
    const containerStyles = css({
        spaceY: "4",
    });

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 생성 옵션"
        >
            <PasswordLengthControl
                length={options.length}
                onLengthChange={(length) => onChange({ ...options, length })}
            />
            <PasswordCharacterOptions
                options={options}
                onOptionsChange={onChange}
            />
        </div>
    );
};

export default PasswordOptions;
