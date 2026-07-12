import React, { useState, useEffect } from "react";
import { css } from "../../../styled-system/css";
import PasswordLength from "../PasswordLength";
import { toast } from "react-toastify";
import { PASSWORD_LENGTH } from "../../constants/passwordConfig";
import { useDebounce } from "../../utils/debounce";
import { ERROR_MESSAGES } from "../../constants/messages";

interface PasswordLengthControlProps {
  length: number;
  onLengthChange: (length: number) => void;
}

const PasswordLengthControl = ({
  length,
  onLengthChange
}: PasswordLengthControlProps) => {
  const [localLength, setLocalLength] = useState<number | string>(length);
  const containerStyles = css({ spaceY: "2" });

  const inputStyles = css({
    w: "full",
    cursor: "pointer",
    appearance: "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0
    },
    "&:focus-visible": {
      outline: "2px solid token(colors.primary)",
      outlineOffset: "2px"
    },
    border: "2px solid token(colors.border)",
    borderRadius: "md",
    p: "2",
    textAlign: "left",
    fontWeight: "medium",
    fontSize: "md",
    color: "text",
    _hover: {
      bg: "muted"
    }
  });

  const rangeStyles = css({
    w: "full",
    padding: "2",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "md",
    fontSize: "sm",
    _focus: {
      outline: "2px solid",
      outlineColor: "blue.500",
      outlineOffset: "2px"
    }
  });

  const debouncedOnLengthChange = useDebounce((value: number) => {
    onLengthChange(value);
  }, 300);

  useEffect(() => {
    setLocalLength(length);
  }, [length]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string while typing
    if (inputValue === "") {
      setLocalLength("");
      return;
    }

    const value = Number(inputValue);

    // Only update if it's a valid number
    if (!isNaN(value)) {
      setLocalLength(value);
    }
  };

  const handleBlur = () => {
    let finalValue = localLength;

    // Convert empty string or non-number to MIN
    if (finalValue === "" || isNaN(Number(finalValue))) {
      finalValue = PASSWORD_LENGTH.MIN;
    } else {
      finalValue = Number(finalValue);
    }

    // Clamp to valid range
    if (finalValue < PASSWORD_LENGTH.MIN) {
      toast.error(ERROR_MESSAGES.PASSWORD_LENGTH_MAX(PASSWORD_LENGTH.MAX));
      finalValue = PASSWORD_LENGTH.MIN;
    } else if (finalValue > PASSWORD_LENGTH.MAX) {
      toast.error(ERROR_MESSAGES.PASSWORD_LENGTH_MAX(PASSWORD_LENGTH.MAX));
      finalValue = PASSWORD_LENGTH.MAX;
    }

    setLocalLength(finalValue);
    debouncedOnLengthChange(finalValue);
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
        value={localLength}
        onChange={handlePasswordChange}
        onBlur={handleBlur}
        className={inputStyles}
        step={1}
      />
      <input
        type="range"
        min={PASSWORD_LENGTH.MIN}
        max={PASSWORD_LENGTH.MAX}
        value={typeof localLength === "string" ? PASSWORD_LENGTH.MIN : localLength}
        onChange={(e) => {
          const value = Number(e.target.value);
          setLocalLength(value);
          debouncedOnLengthChange(value);
        }}
        className={rangeStyles}
        aria-label="비밀번호 길이 슬라이더"
      />
      <div id="password-length-description" className="sr-only">
        비밀번호 길이를 {PASSWORD_LENGTH.MIN}자에서 {PASSWORD_LENGTH.MAX}자
        사이로 조절할 수 있습니다.
      </div>
      <PasswordLength passwordLength={Math.round(typeof localLength === "string" ? PASSWORD_LENGTH.MIN : localLength)} />
    </div>
  );
};

export default PasswordLengthControl;
