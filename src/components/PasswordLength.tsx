import { css } from "../../styled-system/css";

const PASSWORD_LENGTH = {
    MIN: 8,
    RECOMMEND: 12,
    MAX: 16
} as const;

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontSize: "lg",
        fontWeight: "semibold",
        minWidth: "7rem",
        color: passwordLength === 0 ? "red.300" : "gray.500"
    });

    const lengthDisplayStyles = css({
        minWidth: "7rem"
    });

    const getLengthMessage = (length: number) => {
        if (length === 0) return "길이를 선택해주세요.";
        if (length < PASSWORD_LENGTH.MIN)
            return `비밀번호 길이가 너무 짧습니다 (${length}자)`;
        if (length > PASSWORD_LENGTH.MAX)
            return `비밀번호 길이가 너무 깁니다 (${length}자)`;
        return `비밀번호 길이 ${length}자`;
    };

    return (
        <div className={containerStyles} role="status" aria-live="polite">
            <div className={lengthDisplayStyles}>
                {getLengthMessage(passwordLength)}
            </div>
        </div>
    );
};

export default PasswordLength;
