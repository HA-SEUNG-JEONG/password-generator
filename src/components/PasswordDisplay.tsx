import { useState, memo, lazy, Suspense } from "react";
import { css } from "../../styled-system/css";
import CopyIcon from "./CopyIcon";
import EyeOff from "../assets/eye-off-1.svg";
import EyeOn from "../assets/eye-1.svg";
import RefreshIcon from "./RefreshIcon";
import { toast } from "react-toastify";
import KakaoButton from "./KakaoButton";

// 코드 스플리팅: zxcvbn 라이브러리(~800KB)를 포함하는 컴포넌트를 지연 로딩
const PasswordStrengthIndicator = lazy(
  () => import("./PasswordStrengthIndicator")
);

interface PasswordDisplayProps {
  password: string;
  onRefresh: () => void;
}

const PasswordDisplay = ({ password, onRefresh }: PasswordDisplayProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePasswordCopy = async () => {
    if (!navigator.clipboard) {
      toast.error("클립보드 기능을 사용할 수 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success("비밀번호가 복사되었습니다.");
    } catch (error) {
      toast.error("비밀번호 복사에 실패했습니다.");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
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
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          boxSizing: "border-box"
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
            bg: "card",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            userSelect: "none",
            overflow: "hidden",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box"
          })}
        >
          <div
            className={css({
              width: "100%",
              textAlign: "center",
              paddingRight: "40px",
              overflow: "hidden",
              minWidth: 0,
              flex: "1 1 0%"
            })}
          >
            {password ? (
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                aria-label="생성된 비밀번호"
                aria-readonly="true"
                aria-describedby="password-strength"
                className={css({
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: 0,
                  textAlign: "center",
                  border: "none",
                  color: "text",
                  fontFamily: "monospace",
                  outline: "none",
                  bg: "transparent",
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  boxSizing: "border-box",
                  cursor: "text",
                  userSelect: "all",
                  _focus: {
                    outline: "2px solid",
                    outlineColor: "ring",
                    outlineOffset: "2px"
                  }
                })}
              />
            ) : (
              <span role="status" aria-live="polite">
                비밀번호를 생성해주세요
              </span>
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
              color: "text",
              _hover: {
                opacity: 0.8
              },
              _focus: {
                outline: "2px solid",
                outlineColor: "ring",
                outlineOffset: "2px",
                borderRadius: "sm"
              }
            })}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            aria-pressed={showPassword}
            type="button"
          >
            <img
              src={showPassword ? EyeOff : EyeOn}
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              width="24"
              height="24"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <Suspense
        fallback={
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "4",
              height: "50px",
              justifyContent: "center"
            })}
          >
            <div
              className={css({
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "3px solid",
                borderColor: "gray.300",
                borderTopColor: "gray.600",
                borderRadius: "full",
                animation: "spin 0.6s linear infinite"
              })}
            />
          </div>
        }
      >
        <PasswordStrengthIndicator password={password} />
      </Suspense>

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
          disabled={!password}
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
            },
            _focus: {
              outline: "2px solid",
              outlineColor: "ring",
              outlineOffset: "2px"
            },
            _disabled: {
              opacity: 0.5,
              cursor: "not-allowed",
              _hover: {
                transform: "none",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }
            }
          })}
          aria-label="비밀번호 클립보드에 복사하기"
        >
          <CopyIcon aria-hidden="true" />
          복사하기
        </button>
        <button
          type="button"
          onClick={handleRefresh}
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
            },
            _focus: {
              outline: "2px solid",
              outlineColor: "ring",
              outlineOffset: "2px"
            }
          })}
          aria-label="새로운 비밀번호 생성하기"
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              transition: "transform 0.5s ease-in-out",
              transform: isRefreshing ? "rotate(180deg)" : "rotate(0deg)"
            })}
          >
            <RefreshIcon aria-hidden="true" />
          </div>
          새로 생성
        </button>
        <KakaoButton
          options={{
            objectType: "text",
            text: `비밀번호 생성기를 사용해보세요!`,
            link: {
              webUrl: window.location.href
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(PasswordDisplay);
