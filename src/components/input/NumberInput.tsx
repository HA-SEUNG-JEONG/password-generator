interface NumberInputProps {
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({ handlePasswordChange }: NumberInputProps) => {
    return (
        <div className="flex items-center">
            <input
                type="number"
                placeholder="0"
                className="border border-black p-1 rounded-md"
                onChange={handlePasswordChange}
            />
        </div>
    );
};

export default NumberInput;
