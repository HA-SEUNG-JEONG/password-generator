const PASSWORD_LENGTH = {
    MIN: 8,
    RECOMMEND: 12,
    MAX: 16
} as const;

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    return (
        <div className={`flex items-center text-lg font-semibold `}>
            <div className="min-w-[7rem]">
                {passwordLength === 0
                    ? "길이를 선택하세요"
                    : `비밀번호 길이: ${passwordLength}`}
            </div>
        </div>
    );
};

export default PasswordLength;
