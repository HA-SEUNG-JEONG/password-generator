import React, { memo } from "react";
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
    // 고유 ID 생성 (description이 있을 경우 aria-describedby에 사용)
    const descriptionId = description ? `desc-${label.replace(/\s+/g, "-")}` : undefined;

    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        gap: "2",
        spaceX: "2",
        cursor: "pointer",
        padding: "1",
        borderRadius: "md",
        _hover: {
            color: "gray.900",
            backgroundColor: "gray.100"
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
        border: "1px solid #E2E8F0",
        cursor: "pointer",
        _focusVisible: {
            outline: "2px solid",
            outlineColor: "ring",
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
        color: "text",
        userSelect: "none",
        cursor: "pointer",
        _hover: {
            color: "gray.900"
        }
    });

    const descriptionStyles = css({
        fontSize: "xs",
        color: "gray.600",
        userSelect: "none",
        _dark: {
            color: "gray.400"
        }
    });

    return (
        <label className={containerStyles}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.checked)
                }
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
