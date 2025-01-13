interface CheckboxOptionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

const CheckboxOption = ({ checked, onChange, label }: CheckboxOptionProps) => {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                role="checkbox"
                aria-checked={checked}
                aria-label={label}
            />
            <span>{label}</span>
        </label>
    );
};

export default CheckboxOption;
