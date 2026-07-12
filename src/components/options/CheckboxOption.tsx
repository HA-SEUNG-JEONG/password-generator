import React, { memo } from "react";
import { css } from "../../../styled-system/css";

interface CheckboxOptionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
}

const CheckboxOption = ({
    checked,
    onChange,
    label,
    description,
    disabled = false
}: CheckboxOptionProps) => {
    // 고유 ID 생성 (description이 있을 경우 aria-describedby에 사용)
    const descriptionId = description ? `desc-${label.replace(/\s+/g, "-")}` : undefined;

    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        gap: "2",
        spaceX: "2",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "1",
        borderRadius: "md",
        opacity: disabled ? 0.6 : 1,
        _hover: {
            color: disabled ? "inherit" : "text",
            backgroundColor: disabled ? "transparent" : "muted"
        },
        _focusWithin: {
            outline: "2px solid",
            outlineColor: "ring",
            outlineOffset: "2px"
        }
    });

    const checkboxStyles = css({
        width: "1.2rem",
        height: "1.2rem",
        borderRadius: "0.25rem",
        border: "1px solid",
        borderColor: "border",
        cursor: disabled ? "not-allowed" : "pointer"
    });

    const labelContainerStyles = css({
        display: "flex",
        flexDirection: "column",
        gap: "0.5"
    });

    const labelStyles = css({
        fontSize: "sm",
        fontWeight: "medium",
        color: "text",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        _hover: {
            color: disabled ? "inherit" : "text"
        }
    });

    const descriptionStyles = css({
        fontSize: "xs",
        color: "muted-foreground",
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
                disabled={disabled}
                aria-label={label}
                aria-describedby={descriptionId}
                className={checkboxStyles}
            />
            <div className={labelContainerStyles}>
                <span className={labelStyles}>{label}</span>
                {description && (
                    <span id={descriptionId} className={descriptionStyles}>
                        {description}
                    </span>
                )}
            </div>
        </label>
    );
};

export default memo(CheckboxOption);
