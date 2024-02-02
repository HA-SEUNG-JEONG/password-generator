import { toast } from "react-toastify";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const PasswordInput = ({
    value,
    onRefresh
}: {
    value: string;
    onRefresh: () => void;
}) => {
    const handlePasswordCopy = () => {
        try {
            navigator.clipboard.writeText(value || "");
            if (value === "") toast.error("비밀번호가 비어있습니다.");
            toast.success("비밀번호가 복사되었습니다.");
        } catch (err) {
            if (err instanceof Error) toast.error(err.message);
        }
    };

    const handleRefreshPassword = () => {
        onRefresh();
    };
    return (
        <>
            <div className="relative">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                >
                    비밀번호
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    id="password"
                    readOnly
                    value={value ?? ""}
                />

                <button
                    onClick={handlePasswordCopy}
                    className="cursor-pointer hover:opacity-40 absolute right-10 top-[70%] transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                </button>
                {/* 복사하기 버튼 */}
                <button
                    onClick={handleRefreshPassword}
                    className="cursor-pointer hover:opacity-40 absolute right-3 top-[70%] transform -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                    </svg>
                </button>
            </div>
            <PasswordStrengthIndicator password={value} />
        </>
    );
};

export default PasswordInput;
