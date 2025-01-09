const PasswordLength = ({ passwordLength }: { passwordLength: number }) => {
    const getColorClass = () => {
        if (passwordLength === 0) return "text-gray-400";
        if (passwordLength < 8) return "text-red-600";
        if (passwordLength < 12) return "text-yellow-600";
        return "text-green-600";
    };

    return (
        <div
            className={`flex items-center gap-2 text-sm font-medium ${getColorClass()}`}
        >
            <span className="min-w-[7rem]">
                {passwordLength === 0
                    ? "길이를 선택하세요"
                    : `비밀번호 길이: ${passwordLength}`}
            </span>
            <span className="text-sm font-bold">
                {passwordLength > 0 &&
                    `(추천: ${passwordLength < 12 ? "12자 이상" : "적정"})`}
            </span>
        </div>
    );
};

export default PasswordLength;
