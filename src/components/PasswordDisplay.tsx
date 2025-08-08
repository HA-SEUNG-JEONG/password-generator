import { useState, useRef, useEffect } from "react";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import RefreshIcon from "./RefreshIcon";

interface PasswordDisplayProps {
    password: string;
    onGenerate: () => void;
    isPwned?: boolean;
}

const PasswordDisplay = ({
    password,
    onGenerate,
    isPwned = false
}: PasswordDisplayProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const displayTimer = useRef<NodeJS.Timeout>();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setIsCopied(true);

            // Clear any existing timer
            if (displayTimer.current) {
                clearTimeout(displayTimer.current);
            }

            // Set a new timer
            displayTimer.current = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    // Clean up the timer on component unmount
    useEffect(() => {
        return () => {
            if (displayTimer.current) {
                clearTimeout(displayTimer.current);
            }
        };
    }, []);

    const containerStyles = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        border: "1px solid",
        borderColor: "gray.300",
        borderRadius: "0.375rem",
        backgroundColor: "white",
        marginBottom: "1rem",
        _focusWithin: {
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--colors-blue-500)"
        }
    });

    const passwordStyles = css({
        flex: 1,
        fontFamily: "monospace",
        fontSize: "1.125rem",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        padding: 0,
        margin: 0,
        color: isPwned ? "red.500" : "inherit",
        fontWeight: isPwned ? "bold" : "normal"
    });

    const buttonStyles = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        border: "none",
        borderRadius: "0.25rem",
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "gray.500",
        _hover: {
            backgroundColor: "gray.100",
            color: "gray.700"
        },
        _focus: {
            outline: "none",
            boxShadow: "0 0 0 2px var(--colors-blue-200)"
        }
    });

    const warningStyles = css({
        fontSize: "0.875rem",
        color: "red.500",
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem"
    });

    const copyButtonLabel = isCopied ? "복사됨!" : "비밀번호 복사";
    const showPasswordLabel = showPassword
        ? "비밀번호 가리기"
        : "비밀번호 표시";
    const displayPassword = showPassword
        ? password
        : "•".repeat(password.length > 20 ? 20 : password.length);

    return (
        <div>
            <div className={containerStyles}>
                <input
                    type="text"
                    value={displayPassword}
                    readOnly
                    className={passwordStyles}
                    aria-label="생성된 비밀번호"
                />
                <div className={css({ display: "flex", gap: "0.25rem" })}>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={buttonStyles}
                        aria-label={showPasswordLabel}
                        title={showPasswordLabel}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {showPassword ? (
                                <>
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </>
                            ) : (
                                <>
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </>
                            )}
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className={buttonStyles}
                        aria-label={copyButtonLabel}
                        title={copyButtonLabel}
                    >
                        <CopyIcon />
                    </button>
                    <button
                        type="button"
                        onClick={onGenerate}
                        className={buttonStyles}
                        aria-label="새로 생성"
                        title="새로 생성"
                    >
                        <RefreshIcon />
                    </button>
                </div>
            </div>

            {isPwned && (
                <div className={warningStyles}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>
                        이 비밀번호는 데이터 유출 사고에 노출되었을 수 있습니다.
                        다른 비밀번호를 사용해주세요.
                    </span>
                </div>
            )}
        </div>
    );
};

export default PasswordDisplay;
