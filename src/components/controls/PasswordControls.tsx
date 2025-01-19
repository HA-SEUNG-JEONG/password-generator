import PasswordLength from "../PasswordLength";

interface PasswordLengthControlProps {
    length: number;
    onLengthChange: (length: number) => void;
}

const PasswordLengthControl = ({
    length,
    onLengthChange
}: PasswordLengthControlProps) => {
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (!(value >= 8 && value <= 30)) {
            alert("비밀번호 길이는 8자 이상 30자 이하로 입력해주세요.");
        }
        if (value >= 8 && value <= 30) return onLengthChange(value);
    };
    return (
        <div className="space-y-2">
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
                className="w-full"
                step={0.1}
            />

            <PasswordLength passwordLength={Math.round(length)} />
        </div>
    );
};

export default PasswordLengthControl;
