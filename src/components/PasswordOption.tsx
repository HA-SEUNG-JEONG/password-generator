// components/PasswordOptions/index.tsx

import PasswordLength from "./PasswordLength";

interface PasswordOptionsProps {
    options: {
        length: number;
        lowercase: boolean;
        uppercase: boolean;
        numbers: boolean;
        special: boolean;
    };
    onChange: (options: any) => void;
}

const PasswordOptions = ({ options, onChange }: PasswordOptionsProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <input
                    type="range"
                    min={8}
                    max={30}
                    value={options.length}
                    onChange={(e) =>
                        onChange({ ...options, length: Number(e.target.value) })
                    }
                    className="w-full"
                />
                <PasswordLength passwordLength={options.length} />
            </div>

            <div className="space-y-2">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={options.lowercase}
                        onChange={(e) =>
                            onChange({
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
                            onChange({
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
                            onChange({ ...options, numbers: e.target.checked })
                        }
                    />
                    <span>숫자 포함</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={options.special}
                        onChange={(e) =>
                            onChange({ ...options, special: e.target.checked })
                        }
                    />
                    <span>특수문자 포함</span>
                </label>
            </div>
        </div>
    );
};

export default PasswordOptions;
