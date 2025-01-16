interface NumberInputProps {
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({ handlePasswordChange }: NumberInputProps) => {
    return (
        <div className="flex items-center">
            <label htmlFor="password-length" className="mr-2">
                생성할 비밀번호 길이를 입력해주세요
            </label>
            <input
                type="number"
                id="password-length"
                placeholder="0"
                min={8}
                max={30}
                value={length}
                className="border border-black p-1 rounded-md"
                onChange={handlePasswordChange}
            />
        </div>
    );
};

export default NumberInput;
