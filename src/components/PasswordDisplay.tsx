// components/PasswordDisplay/index.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { createCharacterSet, generatePassword } from "../utils/password";

interface PasswordDisplayProps {
    password: string;
    onRefresh: () => void;
}

const PasswordDisplay = ({ password, onRefresh }: PasswordDisplayProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleCopy = async () => {
        if (!password) {
            toast.error("비밀번호가 비어있습니다");
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            toast.success("비밀번호가 복사되었습니다");
        } catch (err) {
            toast.error("복사에 실패했습니다");
        }
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded"
                value={password}
                readOnly
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "숨기기" : "보기"}
                </button>
                <button onClick={handleCopy}>복사</button>
                <button onClick={onRefresh}>새로고침</button>
            </div>
        </div>
    );
};

export default PasswordDisplay;
