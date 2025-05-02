import { useState } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import RefreshIcon from "./RefreshIcon";
import { toast } from "react-toastify";
import EyeOn from "../assets/eye-1.svg";
import EyeOff from "../assets/eye-off-1.svg";

interface PasswordDisplayProps {
    password: string;
    onRefresh: () => void;
}

const PasswordDisplay = ({ password, onRefresh }: PasswordDisplayProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordCopy = async () => {
        if (!navigator.clipboard) {
            toast.error("클립보드 지원이 되지 않는 브라우저입니다.");
            return;
        }
        try {
            if (password.length === 0) toast.error("비밀번호가 비어있습니다.");
            else {
                await navigator.clipboard.writeText(password);
                toast.success("비밀번호가 복사되었습니다.");
            }
        } catch (err) {
            if (err instanceof Error) toast.error(err.message);
        }
    };

    const handleKakaoShare = () => {
        if (!window.Kakao || !window.Kakao.isInitialized()) {
            toast.error("카카오톡 공유를 사용할 수 없습니다.");

            return;
        }
        if (!password) {
            toast.error("비밀번호가 비어있습니다.");
            return;
        }
        window.Kakao.Share.sendDefault({
            objectType: "text",
            text: `비밀번호 생성기에서 생성된 비밀번호: ${password}\n복사해서 사용하세요!`,
            link: {
                webUrl: window.location.href
            }
        });
    };

    return (
        <div
            className={css({
                p: 6,
                display: "flex",
                flexDirection: "column",
                gap: 4
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 4,
                    borderRadius: "md",
                    bg: "muted",
                    position: "relative"
                })}
            >
                <div
                    className={css({
                        fontSize: "lg",
                        fontWeight: "medium",
                        wordBreak: "break-all",
                        textAlign: "center",
                        p: 2,
                        borderRadius: "md",
                        bg: "white",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        userSelect: "none"
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            textAlign: "center"
                        })}
                    >
                        {password ? (
                            <span
                                className={css({
                                    letterSpacing: showPassword
                                        ? "normal"
                                        : "0.25em",
                                    fontFamily: "monospace"
                                })}
                            >
                                {showPassword
                                    ? password
                                    : "•".repeat(password.length)}
                            </span>
                        ) : (
                            "비밀번호를 생성해주세요"
                        )}
                    </div>
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className={css({
                            position: "absolute",
                            right: "2",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2",
                            display: "flex",
                            alignItems: "center",
                            _hover: {
                                opacity: 0.8
                            }
                        })}
                        aria-label={
                            showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                        }
                    >
                        <img
                            src={showPassword ? EyeOff : EyeOn}
                            alt={
                                showPassword
                                    ? "비밀번호 숨기기"
                                    : "비밀번호 보기"
                            }
                            width="20"
                            height="20"
                        />
                    </button>
                </div>
            </div>

            <PasswordStrengthIndicator password={password} />

            <div
                className={css({
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                        base: "1fr",
                        sm: "repeat(auto-fit, minmax(120px, 1fr))"
                    },
                    width: "100%",
                    maxWidth: "400px",
                    margin: "0 auto"
                })}
            >
                <button
                    type="button"
                    onClick={handlePasswordCopy}
                    className={css({
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        minWidth: "120px",
                        background: "primary",
                        borderRadius: "full",
                        px: 4,
                        py: 2,
                        fontWeight: "bold",
                        color: "primary-foreground",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "sm",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s",
                        _hover: {
                            background: "primary-hover",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                        }
                    })}
                    aria-label="비밀번호 복사하기"
                >
                    <CopyIcon />
                    복사하기
                </button>
                <button
                    type="button"
                    onClick={onRefresh}
                    className={css({
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        minWidth: "120px",
                        background: "secondary",
                        borderRadius: "full",
                        px: 4,
                        py: 2,
                        fontWeight: "bold",
                        color: "secondary-foreground",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "sm",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s",
                        _hover: {
                            background: "secondary-hover",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                        }
                    })}
                    aria-label="새로운 비밀번호 생성하기"
                >
                    <RefreshIcon />
                    새로 생성
                </button>
                <button
                    type="button"
                    onClick={handleKakaoShare}
                    className={css({
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        minWidth: "120px",
                        background: "#FEE500",
                        borderRadius: "full",
                        px: 4,
                        py: 2,
                        fontWeight: "bold",
                        color: "#181600",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "sm",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s",
                        _hover: {
                            background: "#FFE812",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                        }
                    })}
                    aria-label="카카오톡으로 공유하기"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <circle cx="20" cy="20" r="20" fill="#3C1E1E" />
                        <path
                            d="M20 10C14.4772 10 10 13.5899 10 18.0001C10 20.6352 11.9302 22.9172 14.7352 24.1842C14.3672 25.4292 13.5702 27.4292 13.5702 27.4292C13.5702 27.4292 13.5072 27.5702 13.5702 27.5702C13.6332 27.5702 13.7352 27.5072 13.7352 27.5072C15.3672 26.5702 16.3672 25.9292 16.7352 25.6842C17.7892 25.8942 18.8772 26.0001 20 26.0001C25.5228 26.0001 30 22.4102 30 18.0001C30 13.5899 25.5228 10 20 10Z"
                            fill="#FEE500"
                        />
                    </svg>
                    공유하기
                </button>
            </div>
        </div>
    );
};

export default PasswordDisplay;
