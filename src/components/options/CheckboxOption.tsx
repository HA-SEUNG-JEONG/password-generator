import { css } from "../../../styled-system/css";

interface CheckboxOptionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

const CheckboxOption = ({ checked, onChange, label }: CheckboxOptionProps) => {
    return (
        <label
            className={css({
                display: "flex",
                alignItems: "center",
                gap: "2",
                spaceX: "2",
                cursor: "pointer",
                "&:hover": {
                    color: "gray.900"
                }
            })}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                role="checkbox"
                aria-checked={checked}
                aria-label={label}
                className={css({
                    width: "1.2rem",
                    height: "1.2rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #E2E8F0"
                })}
            />
            <span
                className={css({
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: "gray.700",
                    userSelect: "none",
                    cursor: "pointer",
                    "&:hover": {
                        color: "gray.900"
                    }
                })}
            >
                {label}
            </span>
        </label>
    );
};

export default CheckboxOption;
