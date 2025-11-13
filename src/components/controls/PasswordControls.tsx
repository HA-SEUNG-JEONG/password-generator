import React, { useState, useEffect } from "react";
import { css } from "../../../styled-system/css";
import PasswordLength from "../PasswordLength";
import { toast } from "react-toastify";
import { PASSWORD_LENGTH } from "../../constants/password";
import { useDebounce } from "../../utils/debounce";

interface PasswordLengthControlProps {
    length: number;
    onLengthChange: (length: number) => void;
}

const PasswordLengthControl = ({
    length,
    onLengthChange
}: PasswordLengthControlProps) => {
    const [localLength, setLocalLength] = useState(length);
    const containerStyles = css({ spaceY: "2" });

    const inputStyles = css({
        w: "full",
        cursor: "pointer",
        "&:focus-visible": {
            outline: "2px solid token(colors.blue.600)",
            outlineOffset: "2px",
        },
        border: "2px solid token(colors.gray.200)",
        borderRadius: "md",
        p: "2",
        textAlign: "left",
        fontWeight: "medium",
        fontSize: "md",
        color: "gray.800",
        _hover: {
            bg: "gray.100",
        },
    });

    const debouncedOnLengthChange = useDebounce((value: number) => {
        onLengthChange(value);
    }, 300);

    useEffect(() => {
        setLocalLength(length);
    }, [length]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (isNaN(value) || value < PASSWORD_LENGTH.MIN) {
            setLocalLength(PASSWORD_LENGTH.MIN);
            return;
        }

        if (value > PASSWORD_LENGTH.MAX) {
            toast.error(`비밀번호는 최대 ${PASSWORD_LENGTH.MAX}자 이하여야 합니다.`);
            setLocalLength(PASSWORD_LENGTH.MAX);
            debouncedOnLengthChange(PASSWORD_LENGTH.MAX);
            return;
        }

        setLocalLength(value);
        debouncedOnLengthChange(value);
    };

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 길이 조절"
            aria-describedby="password-length-description"
        >
            <input
                type="number"
                min={PASSWORD_LENGTH.MIN}
                max={PASSWORD_LENGTH.MAX}
                aria-label="비밀번호 길이"
                aria-valuemin={PASSWORD_LENGTH.MIN}
                aria-valuemax={PASSWORD_LENGTH.MAX}
                aria-valuenow={length}
                value={localLength}
                onChange={handlePasswordChange}
                className={inputStyles}
                step={1}
            />
            <div id="password-length-description" className="sr-only">
                비밀번호 길이를 {PASSWORD_LENGTH.MIN}자에서{" "}
                {PASSWORD_LENGTH.MAX}자 사이로 조절할 수 있습니다.
            </div>
            <PasswordLength passwordLength={Math.round(localLength)} />
        </div>
    );
};

export default PasswordLengthControl;
