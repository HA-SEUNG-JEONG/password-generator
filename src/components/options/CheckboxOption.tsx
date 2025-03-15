import React from "react";
import { css } from "../../../styled-system/css";

interface CheckboxOptionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
}

const CheckboxOption = ({
    checked,
    onChange,
    label,
    description
}: CheckboxOptionProps) => {
    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        gap: "2",
        spaceX: "2",
        cursor: "pointer",
        padding: "1",
        borderRadius: "md",
        "&:hover": {
            color: "gray.900",
            backgroundColor: "gray.100"
        },
        "&:focus-within": {
            outline: "2px solid token(colors.blue.500)",
            outlineOffset: "2px"
        }
    });

    const checkboxStyles = css({
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "0.25rem",
        border: "1px solid #E2E8F0",
        cursor: "pointer",
        "&:focus-visible": {
            outline: "2px solid token(colors.blue.500)",
            outlineOffset: "2px"
        }
    });

    const labelContainerStyles = css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5"
    });

    const labelStyles = css({
        fontSize: "sm",
        fontWeight: "medium",
        color: "gray.700",
        userSelect: "none",
        cursor: "pointer",
        "&:hover": {
            color: "gray.900"
        }
    });

    const descriptionStyles = css({
        fontSize: "xs",
        color: "gray.500",
        userSelect: "none"
    });

    return (
        <label className={containerStyles}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.checked)
                }
                role="checkbox"
                aria-checked={checked}
                aria-label={label}
                className={checkboxStyles}
            />
            <div className={labelContainerStyles}>
                <span className={labelStyles}>{label}</span>
                {description && (
                    <span className={descriptionStyles}>{description}</span>
                )}
            </div>
        </label>
    );
};

export default CheckboxOption;
