import { useState } from "react";

export const IncludeLowercase = ({
    onCheckboxChange
}: {
    onCheckboxChange: (isChecked: boolean) => void;
}) => {
    const handleCheckboxChange = () => {
        setIsChecked((checked) => !checked);
        onCheckboxChange(!isChecked);
    };
    const [isChecked, setIsChecked] = useState(true);
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 "
                id="lowercase"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lowercase"
            >
                소문자 포함
            </label>
        </div>
    );
};
