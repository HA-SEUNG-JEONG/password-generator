import PasswordLength from "./PasswordLength";

interface PasswordLengthControlProps {
    length: number;
    onLengthChange: (length: number) => void;
}

const PasswordLengthControl = ({
    length,
    onLengthChange
}: PasswordLengthControlProps) => (
    <div className="space-y-2">
        <input
            type="range"
            min={8}
            max={30}
            value={length}
            onChange={(e) => onLengthChange(Number(e.target.value))}
            className="w-full"
        />
        <PasswordLength passwordLength={length} />
    </div>
);

export default PasswordLengthControl;
