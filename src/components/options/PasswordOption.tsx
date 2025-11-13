import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "../controls/PasswordControls";
import { css } from "../../../styled-system/css";
import { PasswordOptions as PasswordOptionsType } from "../../types/password";

interface PasswordOptionsProps {
    options: PasswordOptionsType;
    onChange: (options: Partial<PasswordOptionsType>) => void;
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
                onLengthChange={(length) => onChange({ length })}
            />
            <PasswordCharacterOptions
                options={options}
                onOptionsChange={onChange}
            />
        </div>
    );
};

export default PasswordOptions;
