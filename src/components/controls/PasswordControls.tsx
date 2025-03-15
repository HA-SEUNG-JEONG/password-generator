import React from "react";
import { css } from "../../../styled-system/css";
import PasswordLength from "../PasswordLength";

interface PasswordLengthControlProps {
    length: number;
    onLengthChange: (length: number) => void;
}

const PASSWORD_LENGTH = {
    MIN: 8,
    MAX: 30
} as const;

const PasswordLengthControl = ({
    length,
    onLengthChange
}: PasswordLengthControlProps) => {
    const containerStyles = css({
        spaceY: "2"
    });

    const sliderStyles = css({
        w: "full",
        cursor: "pointer",
        "&:focus-visible": {
            outline: "2px solid token(colors.blue.600)",
            outlineOffset: "2px"
        }
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (value < PASSWORD_LENGTH.MIN) {
            alert(
                `비밀번호는 최소 ${PASSWORD_LENGTH.MIN}자 이상이어야 합니다.`
            );
            return;
        }

        if (value > PASSWORD_LENGTH.MAX) {
            alert(`비밀번호는 최대 ${PASSWORD_LENGTH.MAX}자 이하여야 합니다.`);
            return;
        }

        onLengthChange(value);
    };

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 길이 조절"
            aria-describedby="password-length-description"
        >
            <input
                type="range"
                min={PASSWORD_LENGTH.MIN}
                max={PASSWORD_LENGTH.MAX}
                role="slider"
                aria-label="비밀번호 길이"
                aria-valuemin={PASSWORD_LENGTH.MIN}
                aria-valuemax={PASSWORD_LENGTH.MAX}
                aria-valuenow={length}
                value={length}
                onChange={handlePasswordChange}
                className={sliderStyles}
                step={1}
            />
            <div id="password-length-description" className="sr-only">
                비밀번호 길이를 {PASSWORD_LENGTH.MIN}자에서{" "}
                {PASSWORD_LENGTH.MAX}자 사이로 조절할 수 있습니다.
            </div>
            <PasswordLength passwordLength={Math.round(length)} />
        </div>
    );
};

export default PasswordLengthControl;
