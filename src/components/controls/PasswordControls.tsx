import React from "react";
import { css } from "../../../styled-system/css";
import PasswordLength from "../PasswordLength";

interface PasswordLengthControlProps {
    length: number;
    onLengthChange: (length: number) => void;
}

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
            outline: "2px solid token(colors.blue.500)",
            outlineOffset: "2px"
        }
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (!(value >= 8 && value <= 30)) {
            alert("비밀번호 길이는 8자 이상 30자 이하로 입력해주세요.");
        }
        if (value >= 8 && value <= 30) return onLengthChange(value);
    };

    return (
        <div
            className={containerStyles}
            role="group"
            aria-label="비밀번호 길이 조절"
        >
            <input
                type="range"
                min={8}
                max={30}
                role="slider"
                aria-label="비밀번호 길이"
                aria-valuemin={8}
                aria-valuemax={30}
                aria-valuenow={length}
                value={length}
                onChange={handlePasswordChange}
                className={sliderStyles}
                step={1}
            />
            <PasswordLength passwordLength={Math.round(length)} />
        </div>
    );
};

export default PasswordLengthControl;
