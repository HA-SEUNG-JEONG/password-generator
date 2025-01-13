const PASSWORD_LENGTH = {
    MIN: 8,
    RECOMMEND: 12,
    MAX: 16
} as const;

const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    const getColorClass = () => {
        if (passwordLength === 0) return "text-gray-400";
        if (passwordLength < PASSWORD_LENGTH.MIN) return "text-red-600";
        if (passwordLength < PASSWORD_LENGTH.RECOMMEND)
            return "text-yellow-600";
        return "text-green-600";
    };

    const getRecommendationMessage = (length: number) => {
        if (length === 0) return "";
        if (length < PASSWORD_LENGTH.MIN) return "(최소 8자 이상)";
        if (length < PASSWORD_LENGTH.RECOMMEND) return "(추천: 12자 이상)";
        return "(적정)";
    };

    return (
        <div
            className={`flex items-center text-sm font-medium ${getColorClass()}`}
        >
            <div className="min-w-[7rem]">
                {passwordLength === 0
                    ? "길이를 선택하세요"
                    : `비밀번호 길이: ${passwordLength}`}
            </div>
            <div className="text-sm font-bold">
                {passwordLength > 0 &&
                    `${getRecommendationMessage(passwordLength)}`}
            </div>
        </div>
    );
};

export default PasswordLength;
