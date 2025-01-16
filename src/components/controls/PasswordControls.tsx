import NumberInput from "../input/NumberInput";
import RangeInput from "../input/RangeInput";
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
        return onLengthChange(Number(e.target.value));
    };
    return (
        <div className="space-y-2">
            <RangeInput handlePasswordChange={handlePasswordChange} />
            <NumberInput handlePasswordChange={handlePasswordChange} />
            <PasswordLength passwordLength={length} />
        </div>
    );
};

export default PasswordLengthControl;
