import { onCheckboxChangeProps } from "../utils";

interface IncludeCheckBoxProps extends onCheckboxChangeProps {
    checked: boolean;
}

const IncludeCheckBox = ({
    onCheckboxChange,
    pattern,
    checked
}: IncludeCheckBoxProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(e.target.checked);
    };
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 "
                id={pattern}
                checked={checked}
                onChange={onChange}
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={pattern}
            >
                {pattern}
            </label>
        </div>
    );
};

export default IncludeCheckBox;
