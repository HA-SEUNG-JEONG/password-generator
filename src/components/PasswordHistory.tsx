// PasswordHistory.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface PasswordHistoryProps {
    currentPassword: string;
}

const PasswordHistory = ({ currentPassword }: PasswordHistoryProps) => {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        if (currentPassword) {
            setHistory((prev) => {
                const newHistory = [currentPassword, ...prev].slice(0, 10);
                localStorage.setItem(
                    "passwordHistory",
                    JSON.stringify(newHistory)
                );
                return newHistory;
            });
        }
    }, [currentPassword]);

    const handleCopyPassword = (password: string) => {
        navigator.clipboard.writeText(password);
        toast.success("이전 비밀번호가 복사되었습니다.");
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">비밀번호 히스토리</h3>
            <div className="space-y-2">
                {history.map((password, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded"
                    >
                        <span className="font-mono">{password}</span>
                        <button
                            onClick={() => handleCopyPassword(password)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            복사
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordHistory;
