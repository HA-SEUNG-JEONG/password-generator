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
    <div className="space-y-2">
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) =>
                    onOptionsChange({
                        ...options,
                        lowercase: e.target.checked
                    })
                }
            />
            <span>소문자 포함</span>
        </label>
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) =>
                    onOptionsChange({
                        ...options,
                        uppercase: e.target.checked
                    })
                }
            />
            <span>대문자 포함</span>
        </label>
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) =>
                    onOptionsChange({ ...options, numbers: e.target.checked })
                }
            />
            <span>숫자 포함</span>
        </label>
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={options.special}
                onChange={(e) =>
                    onOptionsChange({ ...options, special: e.target.checked })
                }
            />
            <span>특수문자 포함</span>
        </label>
    </div>
);

export default PasswordCharacterOptions;
