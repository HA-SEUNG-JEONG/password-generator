interface RangeInputProps {
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput = ({ handlePasswordChange }: RangeInputProps) => {
    return (
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
        />
    );
};

export default RangeInput;
