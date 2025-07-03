import { css } from "../../styled-system/css";

const PASSWORD_LENGTH = {
    MIN: 8,
    RECOMMEND: 12,
    MAX: 30
} as const;

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontSize: "lg",
        fontWeight: "semibold",
        minWidth: "7rem",
        color:
            passwordLength === 0
                ? "red.700"
                : passwordLength < PASSWORD_LENGTH.MIN ||
                    passwordLength > PASSWORD_LENGTH.MAX
                  ? "orange.700"
                  : "gray.800",
    });

    const lengthDisplayStyles = css({
        minWidth: "7rem",
    });

    const getLengthMessage = (length: number) => {
        if (length < PASSWORD_LENGTH.MIN) {
            return `최소 ${PASSWORD_LENGTH.MIN}자`;
        }
        if (length > PASSWORD_LENGTH.MAX) {
            return `최대 ${PASSWORD_LENGTH.MAX}자`;
        }
        if (length < PASSWORD_LENGTH.RECOMMEND) {
            return `비밀번호 길이: ${length}자 (권장: ${PASSWORD_LENGTH.RECOMMEND}자 이상)`;
        }
        return `비밀번호 길이: ${length}자`;
    };

    return (
        <div
            className={containerStyles}
            role="status"
            aria-live="polite"
            aria-label={getLengthMessage(passwordLength)}
        >
            <div className={lengthDisplayStyles}>
                {getLengthMessage(passwordLength)}
            </div>
        </div>
    );
};

export default PasswordLength;
