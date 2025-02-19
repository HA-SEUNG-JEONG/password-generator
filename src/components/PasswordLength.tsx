import { css } from "../../styled-system/css";

const PASSWORD_LENGTH = {
    MIN: 8,
    RECOMMEND: 12,
    MAX: 16
} as const;

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    return (
        // <div className={`flex items-center text-lg font-semibold `}>
        //     <div className="min-w-[7rem]">
        //         {passwordLength === 0
        //             ? "길이를 선택하세요"
        //             : `비밀번호 길이: ${passwordLength}`}
        //     </div>
        // </div>
        <div
            className={css({
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontSize: "lg",
                fontWeight: "semibold",
                minWidth: "7rem",
                color: passwordLength === 0 ? "red.300" : "gray.500"
            })}
        >
            <div
                className={css({
                    minWidth: "7rem"
                })}
            >
                {passwordLength === 0
                    ? "길이를 선택해주세요."
                    : `비밀번호 길이 ${passwordLength}`}
            </div>
        </div>
    );
};

export default PasswordLength;
