// components/PasswordOptions/index.tsx

import PasswordCharacterOptions from "./PasswordCharacterOptions";
import PasswordLengthControl from "./PasswordControls";
import PasswordLength from "./PasswordLength";

interface CharacterOptions {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
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
    }) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
    return (
        <div className="space-y-4">
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
